import {Component, Input} from '@angular/core';
import {Listoverview} from "../shared/listoverview";

@Component({
  selector: 'a.kwmen-listoverview-list-item',
  standalone: true,
  imports: [],
  templateUrl: './listoverview-list-item.component.html'
})
export class ListoverviewListItemComponent {
  @Input() listoverview: Listoverview | undefined;
}
