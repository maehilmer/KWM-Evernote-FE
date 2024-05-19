import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Note} from "../shared/note";
import {SearchComponent} from "../search/search.component";
@Component({
  selector: 'kwmen-home',
  standalone: true,
  imports: [RouterLink,SearchComponent],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {
  constructor(private router: Router, private route: ActivatedRoute) { }
  noteSelected(note: Note) {
    this.router.navigate(['../notes', note.id],
      { relativeTo: this.route });
  }

}
