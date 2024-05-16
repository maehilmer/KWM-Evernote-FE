import {Component, Input} from '@angular/core';
import {Label, Todo, Image} from "../shared/todo";
@Component({
  selector: 'a.kwmen-todo-list-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-list-item.component.html'
})
export class TodoListItemComponent {
  @Input() todo: Todo | undefined;
}
