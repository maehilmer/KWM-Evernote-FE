import {Component, Input} from '@angular/core';
import {Label} from "../shared/label";

@Component({
  selector: 'a.kwmen-label-list-item',
  standalone: true,
  imports: [],
  templateUrl: './label-list-item.component.html',
  styles: ``
})
export class LabelListItemComponent {
  @Input() label: Label | undefined;
}
