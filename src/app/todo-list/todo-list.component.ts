import {Component, OnInit} from '@angular/core';
import {Label, Todo, Image} from "../shared/todo";
import {TodoListItemComponent} from "../todo-list-item/todo-list-item.component";
import {KwmevernoteStoreService} from "../shared/kwmevernote-store.service";
import {RouterLink} from "@angular/router";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'kwmen-todo-list',
  standalone: true,
  imports: [TodoListItemComponent, RouterLink],
  templateUrl: './todo-list.component.html',
  styles: ``
})
export class TodoListComponent implements OnInit{
  todos: Todo[] = [];

  constructor(private kwmen: KwmevernoteStoreService,
              public authService: AuthenticationService){ }


  ngOnInit() {
    this.kwmen.getAllTodos().subscribe(res => this.todos = res);
  }

}
