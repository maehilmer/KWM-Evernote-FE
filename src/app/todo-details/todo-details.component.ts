import {Component, OnInit} from '@angular/core';
import {Label, Todo, Image} from "../shared/todo";
import {KwmevernoteStoreService} from "../shared/kwmevernote-store.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {TodoFactory} from "../shared/todo-factory";

@Component({
  selector: 'kwmen-todo-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './todo-details.component.html',
  styles: ``
})
export class TodoDetailsComponent implements OnInit {
  todo: Todo = TodoFactory.empty();

  constructor(
    private kwmen: KwmevernoteStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit() {
    const params = this.route.snapshot.params;
    this.kwmen.getSingleTodo(params['id']).subscribe((t:Todo) => this.todo = t);
  }

  removeTodo() {
    if (confirm('Todo wirklich löschen?')) {
      this.kwmen.removeTodo(this.todo.id)
        .subscribe((res: any) => this.router.navigate(['../'], {
          relativeTo:
          this.route
        }));
    }
  }

}
