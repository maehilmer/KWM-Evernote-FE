import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {TodoFactory} from "../shared/todo-factory";
import {KwmevernoteStoreService} from "../shared/kwmevernote-store.service";
import {Todo} from "../shared/todo";
import {TodoFormErrorMessages} from "../todo-form/todo-form-error-messages";


@Component({
  selector: 'kwmen-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './todo-form.component.html',
  styles: ``
})
export class TodoFormComponent {
  todoForm: FormGroup;
  todo = TodoFactory.empty(); // man muss sich nicht mit undefined herumschlagen und hat immer eine Notiz zur Hand
  errors: { [key: string]: string } = {};
  isUpdatingTodo = false;
  images: FormArray;
  notes: Array<any> = [];

  constructor(
    private fb: FormBuilder,
    private kwmen: KwmevernoteStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.todoForm = this.fb.group({});
    this.images = this.fb.array([]);
  }

  ngOnInit() {
    this.loadNotes();
    const id = this.route.snapshot.params["id"];
    if (id) {
      this.isUpdatingTodo = true;
      this.kwmen.getSingleTodo(id).subscribe(todo => {
        this.todo = todo;
        this.initTodo();
      });
    }
    this.initTodo();
  }

  loadNotes() {
    this.kwmen.getAllNotes().subscribe(notes => {
      this.notes = notes;
    });
  }

  initTodo() {
    this.buildThumbnailsArray();
    this.todoForm = this.fb.group({
      id: this.todo.id,
      title: [this.todo.title, Validators.required],
      description: this.todo.description,
      due: [this.todo.due, Validators.required],
      isPublic: this.todo.isPublic,
      note_id: [this.todo.note_id, Validators.required],
      images: this.images
    });
    this.todoForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());
  }

  buildThumbnailsArray() {
    if(this.todo.images) {
      this.images = this.fb.array([]);

      for(let img of this.todo.images) {
        let fg = this.fb.group ({
          id: new FormControl(img.id),
          url: new FormControl(img.url, [Validators.required]),
          title: new FormControl(img.title, [Validators.required])
        });
        this.images.push(fg);
      }
      if(this.todo.images.length === 0)
        this.addThumbnailControl();
    }
  }

  addThumbnailControl() {
    this.images.push(this.fb.group({id: 0, url: null, title: null}));
  }

  submitForm() {
    // Array-Methode, die ein neues Array mit allen Elementen erstellt, die den Test bestehen, der in der bereitgestellten Funktion implementiert ist
    this.todoForm.value.images = this.todoForm.value.images.filter(
      (thumbnail: { url: string; }) => thumbnail.url); // Thumbnail ist Objekt mit min einer url-Eigenschaft -> Nur Thumbnails mit einer gültigen url bleiben im Array

    const todo: Todo = TodoFactory.fromObject(this.todoForm.value);

    if (this.isUpdatingTodo) {
      this.kwmen.updateTodo(todo).subscribe(res => {
        this.router.navigate(["../../todos", todo.id], {
          relativeTo: this.route
        });
      });
    } else {
      console.log(todo);
      this.kwmen.createTodo(todo).subscribe(res => {
        this.todo = TodoFactory.empty();
        this.todoForm.reset(TodoFactory.empty());
        this.router.navigate(["/todos"], {relativeTo: this.route});
      });
    }
  }

  updateErrorMessages() {
    console.log("Is invalid? " + this.todoForm.invalid);
    this.errors = {};
    for (const message of TodoFormErrorMessages) {
      const control = this.todoForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid && control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }
}
