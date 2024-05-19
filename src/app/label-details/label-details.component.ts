import { Component } from '@angular/core';
import {Label} from "../shared/label";
import {LabelFactory} from "../shared/label-factory";
import {KwmevernoteStoreService} from "../shared/kwmevernote-store.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'kwmen-label-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './label-details.component.html',
  styles: ``
})
export class LabelDetailsComponent {
  label: Label = LabelFactory.empty();

  constructor(
    private kwmen: KwmevernoteStoreService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthenticationService
  ) { }
  ngOnInit() {
    const params = this.route.snapshot.params;
    this.kwmen.getSingleLabel(params['id']).subscribe((n:Label) => this.label = n);
  }

  removeLabel() {
    if (confirm('Label wirklich löschen?')) {
      this.kwmen.removeLabel(this.label.id)
        .subscribe((res: any) => this.router.navigate(['../'], {
          relativeTo:
          this.route
        }));
    }
  }
}
