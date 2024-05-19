import {Component, OnInit} from '@angular/core';
import {Listoverview} from "../shared/listoverview";
import {ListoverviewListItemComponent} from "../listoverview-list-item/listoverview-list-item.component";
import {KwmevernoteStoreService} from "../shared/kwmevernote-store.service";
import {RouterLink} from "@angular/router";
import {NoteListItemComponent} from "../note-list-item/note-list-item.component";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'kwmen-listoverview-list',
  standalone: true,
    imports: [ListoverviewListItemComponent, RouterLink, NoteListItemComponent],
  templateUrl: './listoverview-list.component.html',
  styles: ``
})
export class ListoverviewListComponent implements OnInit{
  listoverviews: Listoverview[] = [];

  constructor(private kwmen: KwmevernoteStoreService,
              public authService: AuthenticationService){ }

  ngOnInit() {
    this.kwmen.getAllListoverviews().subscribe(res => this.listoverviews = res);
  }

}
