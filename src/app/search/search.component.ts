import {Component, EventEmitter, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, filter, switchMap} from "rxjs";
import {KwmevernoteStoreService} from "../shared/kwmevernote-store.service";
import {tap} from "rxjs/operators";
import {Note} from "../shared/note";
import {NgClass} from "@angular/common";
@Component({
  selector: 'kwmen-search',
  standalone: true,
  imports: [NgClass],
  templateUrl: './search.component.html',
  styles: ``
})
export class SearchComponent {
  keyup = new EventEmitter<string>();
  foundNotes: Note[] = []
  protected isLoading = false;
  constructor(private kwmen: KwmevernoteStoreService){}

  // Verzögert die Suchergebnisse um 500ms für angenehmere Bedienbarkeit
  @Output() noteSelected = new EventEmitter<Note>();
  ngOnInit() {
    this.keyup.pipe(filter(term => term!=""))
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .pipe(tap(() => this.isLoading = true))
      .pipe(switchMap(searchTerm => this.kwmen.getAllNotesSearch(searchTerm)))
      .pipe(tap(() => this.isLoading = false))
      .subscribe(notes => this.foundNotes = notes);
  }

}
