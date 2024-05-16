import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {KwmevernoteStoreService} from "../shared/kwmevernote-store.service";
import {Listoverview} from "../shared/listoverview";
import {ListoverviewFactory} from "../shared/listoverview-factory";

@Component({
  selector: 'kwmen-listoverview-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './listoverview-details.component.html'
})
export class ListoverviewDetailsComponent implements OnInit {
  listoverview: Listoverview = ListoverviewFactory.empty();

  constructor(
    private kwmen: KwmevernoteStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit() {
    const params = this.route.snapshot.params;
    this.kwmen.getSingleListoverview(params['id']).subscribe((li:Listoverview) => this.listoverview = li);
  }

  removeListoverview() {
    if (confirm('Liste wirklich löschen?')) {
      this.kwmen.removeListoverview(this.listoverview.id)
        .subscribe((res: any) => this.router.navigate(['../'], {
          relativeTo:
          this.route
        }));
    }
  }
}
