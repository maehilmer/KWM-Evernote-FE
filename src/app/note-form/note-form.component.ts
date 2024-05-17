import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {KwmevernoteStoreService} from "../shared/kwmevernote-store.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NoteFactory} from "../shared/note-factory";
import {Note} from "../shared/note";
import {NoteFormErrorMessages} from "./note-form-error-messages";

@Component({
  selector: 'kwmen-note-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './note-form.component.html',
  styles: ``
})
export class NoteFormComponent {
  noteForm: FormGroup;
  note = NoteFactory.empty(); // man muss sich nicht mit undefined herumschlagen und hat immer eine Notiz zur Hand
  errors: { [key: string]: string } = {};
  isUpdatingNote = false;
  images: FormArray;

  listoverviews: Array<any> = [];
  /*todos: Array<any> = [];*/

  constructor(
    private fb: FormBuilder,
    private kwmen: KwmevernoteStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.noteForm = this.fb.group({});
    this.images = this.fb.array([]);
  }

  // hier wird entschieden, ob man im Update modus ist oder ob notiz neu erstellt wird -> mittels
  // abprüfen der route
  ngOnInit() {
    this.loadListoverviews();
    /*this.loadTodos();*/

    const id = this.route.snapshot.params["id"];
    if (id) {
      this.isUpdatingNote = true;
      this.kwmen.getSingleNote(id).subscribe(note => {
        this.note = note;
        this.initNote();
      });
    }
    this.initNote();
  }

  loadListoverviews() {
    this.kwmen.getAllListoverviews().subscribe(listoverviews => {
      this.listoverviews = listoverviews;
    });
  }

  /*
  loadTodos() {
    this.kwmen.getAllTodos().subscribe(todos => {
      this.todos = todos;
    });
  } */

  initNote() {
    this.buildThumbnailsArray();
    this.noteForm = this.fb.group({
      id: this.note.id,
      title: [this.note.title, Validators.required],
      description: this.note.description,
      listoverview_id: [this.note.listoverview_id, Validators.required],
      /*todos: this.note.todos,*/
      images: this.images
    });
    this.noteForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());
  }

  buildThumbnailsArray() {
    if(this.note.images) {
      this.images = this.fb.array([]);

      for(let img of this.note.images) {
        let fg = this.fb.group ({
          id: new FormControl(img.id),
          url: new FormControl(img.url, [Validators.required]),
          title: new FormControl(img.title, [Validators.required])
        });
        this.images.push(fg);
      }
      if(this.note.images.length === 0)
        this.addThumbnailControl();
    }
  }

  addThumbnailControl() {
    this.images.push(this.fb.group({id: 0, url: null, title: null}));
  }

  submitForm() {
    // leere Werte werden gefiltert
    this.noteForm.value.images = this.noteForm.value.images.filter(
      (thumbnail: { url: string; }) => thumbnail.url);
    const note: Note = NoteFactory.fromObject(this.noteForm.value);

    //just copy the todos
    //note.todos = this.note.todos;
    if (this.isUpdatingNote) {
      this.kwmen.updateNote(note).subscribe(res => {
        this.router.navigate(["../../notes", note.id], {
          relativeTo: this.route
        });
      });
    } else {
      note.user_id = 1; // just for testing
      console.log(note);
      this.kwmen.createNote(note).subscribe(res => {
        this.note = NoteFactory.empty();
        this.noteForm.reset(NoteFactory.empty());
        this.router.navigate(["/notes"], {relativeTo: this.route});
      });
    }
  }

  updateErrorMessages() {
    console.log("Is invalid? " + this.noteForm.invalid);
    this.errors = {};
    for (const message of NoteFormErrorMessages) {
      const control = this.noteForm.get(message.forControl);
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
