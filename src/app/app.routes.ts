import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {NoteListComponent} from "./note-list/note-list.component";
import {NoteDetailsComponent} from "./note-details/note-details.component";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {TodoDetailsComponent} from "./todo-details/todo-details.component";
import {ListoverviewListComponent} from "./listoverview-list/listoverview-list.component";
import {ListoverviewDetailsComponent} from "./listoverview-details/listoverview-details.component";
import {LabelListComponent} from "./label-list/label-list.component";
import {LabelDetailsComponent} from "./label-details/label-details.component";
import {NoteFormComponent} from "./note-form/note-form.component";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'notes', component: NoteListComponent },
  { path: 'notes/:id', component: NoteDetailsComponent },
  { path: 'todos', component: TodoListComponent },
  { path: 'todos/:id', component: TodoDetailsComponent },
  { path: 'listoverviews', component: ListoverviewListComponent },
  { path: 'listoverviews/:id', component: ListoverviewDetailsComponent },
  { path: 'labels', component: LabelListComponent },
  { path: 'labels/:id', component: LabelDetailsComponent },
  // Route zum Neulegen einer Notiz
  { path: 'admin', component: NoteFormComponent },
  // Route zum Updaten einer Notiz
  { path: 'admin/:id', component: NoteFormComponent },

  //{ path: 'admin', component: TodoFormComponent },
  //{ path: 'admin/:id', component: TodoFormComponent },
  //{ path: 'admin', component: ListoverviewFormComponent },
  //{ path: 'admin/:id', component: ListoverviewFormComponent },
  //{ path: 'admin', component: LabelFormComponent },
  //{ path: 'admin/:id', component: LabelFormComponent }
];
