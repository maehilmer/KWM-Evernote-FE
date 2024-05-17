import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {KwmevernoteStoreService} from "../shared/kwmevernote-store.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {TodoFormErrorMessages} from "../todo-form/todo-form-error-messages";
import {TodoFactory} from "../shared/todo-factory";
import {Todo} from "../shared/todo";

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

  constructor(
    private fb: FormBuilder,
    private kwmen: KwmevernoteStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.todoForm = this.fb.group({});
  }

  ngOnInit() {
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

  initTodo() {
    this.todoForm = this.fb.group({
      id: this.todo.id,
      title: [this.todo.title, Validators.required],
      description: this.todo.description,
      due: this.todo.due,
      isPublic: this.todo.isPublic
    });
    this.todoForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());
  }

  submitForm() {

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
    for (const message of this.TodoFormErrorMessages) {
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
