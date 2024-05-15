import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NoteListComponent} from "./note-list/note-list.component";
import {Label, Todo, Note, Image} from "./shared/note";
import {NoteDetailsComponent} from "./note-details/note-details.component";

@Component({
  selector: 'kwmen-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html'
})
export class AppComponent {
  /*
  title = 'kwmevernote';
  listOn = true; // entscheidet, ob Listenansicht aktiviert ist
  detailsOn = false; // entscheidet, ob Detailansicht aktiviert ist

  note: Note | undefined;

  showList() {
    this.listOn = true;
    this.detailsOn = false;
  }
  showDetails(note: Note) {
    this.note = note;
    this.listOn = false;
    this.detailsOn = true;
  } */
}
