import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {NoteListComponent} from "./note-list/note-list.component";
import {NoteDetailsComponent} from "./note-details/note-details.component";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {TodoDetailsComponent} from "./todo-details/todo-details.component";
import {ListoverviewListComponent} from "./listoverview-list/listoverview-list.component";
import {ListoverviewDetailsComponent} from "./listoverview-details/listoverview-details.component";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'notes', component: NoteListComponent },
  { path: 'notes/:id', component: NoteDetailsComponent },
  { path: 'todos', component: TodoListComponent },
  { path: 'todos/:id', component: TodoDetailsComponent },
  { path: 'listoverviews', component: ListoverviewListComponent },
  { path: 'listoverviews/:id', component: ListoverviewDetailsComponent }
];
