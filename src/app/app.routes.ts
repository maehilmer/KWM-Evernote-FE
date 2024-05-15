import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {NoteListComponent} from "./note-list/note-list.component";
import {NoteDetailsComponent} from "./note-details/note-details.component";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'notes', component: NoteListComponent },
  { path: 'notes/:id', component: NoteDetailsComponent }
];
