import {Component, OnInit} from '@angular/core';
import {Label} from "../shared/label";
import {KwmevernoteStoreService} from "../shared/kwmevernote-store.service";
import {LabelListItemComponent} from "../label-list-item/label-list-item.component";
import {RouterLink} from "@angular/router";
import {ListoverviewListItemComponent} from "../listoverview-list-item/listoverview-list-item.component";

@Component({
  selector: 'kwmen-label-list',
  standalone: true,
  imports: [LabelListItemComponent, RouterLink, ListoverviewListItemComponent],
  templateUrl: './label-list.component.html',
  styles: ``
})
export class LabelListComponent implements OnInit{
  labels: Label[] = [];

  constructor(private kwmen: KwmevernoteStoreService){ }

  ngOnInit() {
    this.kwmen.getAllLabels().subscribe(res => this.labels = res);
  }

}
