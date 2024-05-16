import {Component, OnInit} from '@angular/core';
import {Label, Todo, Note, Image} from "../shared/note";
import {NoteListItemComponent} from "../note-list-item/note-list-item.component";
import {KwmevernoteStoreService} from "../shared/kwmevernote-store.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'kwmen-note-list',
  standalone: true,
  imports: [NoteListItemComponent, RouterLink],
  templateUrl: './note-list.component.html',
  styles: ``
})
export class NoteListComponent implements OnInit{
  notes: Note[] = [];

  constructor(private kwmen: KwmevernoteStoreService){ }

  ngOnInit() {
    this.kwmen.getAllNotes().subscribe(res => this.notes = res);
  }
}
