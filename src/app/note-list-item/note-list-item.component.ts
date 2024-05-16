import {Component, Input} from '@angular/core';
import {Note} from "../shared/note";
@Component({
  selector: 'a.kwmen-note-list-item', // a nicht vergessen, sonst wird Verweis nicht erkannt!!
  standalone: true,
  imports: [],
  templateUrl: './note-list-item.component.html'
})
export class NoteListItemComponent {
  @Input() note: Note | undefined;
}
