import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Note, Todo} from "../shared/note";
import {KwmevernoteStoreService} from "../shared/kwmevernote-store.service";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NoteFactory} from "../shared/note-factory";
import {DatePipe} from "@angular/common";
import {TodoListItemComponent} from "../todo-list-item/todo-list-item.component";
import {TodoFactory} from "../shared/todo-factory";

@Component({
  selector: 'kwmen-note-details',
  standalone: true,
  imports: [RouterLink, DatePipe, TodoListItemComponent, RouterLinkActive],
  templateUrl: './note-details.component.html'
})
export class NoteDetailsComponent implements OnInit {
  note: Note = NoteFactory.empty();

  constructor(
    private kwmen: KwmevernoteStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit() {
    // damit bekommt man ganzen Parameter, also Array
    const params = this.route.snapshot.params;
    // je nachdem was ich in der Route vergeben habe, wird dann darauf zugegriffen
    this.kwmen.getSingleNote(params['id']).subscribe((n:Note) => this.note = n);
  }

  removeNote() {
    if (confirm('Notiz wirklich löschen?')) {
      this.kwmen.removeNote(this.note.id)
        .subscribe((res: any) => this.router.navigate(['../'], {
          relativeTo:
          this.route
        }));
    }
  }
}
