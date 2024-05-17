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
import {TodoFormComponent} from "./todo-form/todo-form.component";
import {ListoverviewFormComponent} from "./listoverview-form/listoverview-form.component";
import {LabelFormComponent} from "./label-form/label-form.component";

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
  { path: 'admin', component: NoteFormComponent }, // Route zum Neulegen einer Notiz
  { path: 'admin/:id', component: NoteFormComponent }, // Route zum Updaten einer Notiz
  { path: 'adminTodo', component: TodoFormComponent },
  { path: 'adminTodo/:id', component: TodoFormComponent },
  { path: 'adminList', component: ListoverviewFormComponent },
  { path: 'adminList/:id', component: ListoverviewFormComponent },
  { path: 'adminLabel', component: LabelFormComponent },
  { path: 'adminLabel/:id', component: LabelFormComponent }
];
