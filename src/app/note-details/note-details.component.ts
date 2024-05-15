import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Label, Todo, Note, Image} from "../shared/note";
import {KwmevernoteStoreService} from "../shared/kwmevernote-store.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NoteFactory} from "../shared/note-factory";

@Component({
  selector: 'kwmen-note-details',
  standalone: true,
  imports: [RouterLink],
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
    const params = this.route.snapshot.params;
    this.kwmen.getSingle(params['id']).subscribe((n:Note) => this.note = n);
  }

  removeBook() {
    if (confirm('Notiz wirklich löschen?')) {
      this.kwmen.remove(this.note.id)
        .subscribe((res: any) => this.router.navigate(['../'], {
          relativeTo:
          this.route
        }));
    }
  }
}
