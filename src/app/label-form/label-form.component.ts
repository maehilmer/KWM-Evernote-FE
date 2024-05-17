import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {KwmevernoteStoreService} from "../shared/kwmevernote-store.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {LabelFormErrorMessages} from "./label-form-error-messages";
import {LabelFactory} from "../shared/label-factory";
import {Label} from "../shared/label";

@Component({
  selector: 'kwmen-label-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './label-form.component.html',
  styles: ``
})
export class LabelFormComponent {
  labelForm: FormGroup;
  label = LabelFactory.empty(); // man muss sich nicht mit undefined herumschlagen und hat immer eine Notiz zur Hand
  errors: { [key: string]: string } = {};
  isUpdatingLabel = false;

  constructor(
    private fb: FormBuilder,
    private kwmen: KwmevernoteStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.labelForm = this.fb.group({});
  }

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    if (id) {
      this.isUpdatingLabel = true;
      this.kwmen.getSingleLabel(id).subscribe(label => {
        this.label = label;
        this.initLabel();
      });
    }
    this.initLabel();
  }

  initLabel() {
    this.labelForm = this.fb.group({
      id: this.label.id,
      name: [this.label.name, Validators.required]
    });
    this.labelForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());
  }

  submitForm() {

    const label: Label = LabelFactory.fromObject(this.labelForm.value);

    if (this.isUpdatingLabel) {
      this.kwmen.updateLabel(label).subscribe(res => {
        this.router.navigate(["../../labels", label.id], {
          relativeTo: this.route
        });
      });
    } else {
      label.user_id = 1;
      console.log(label);
      this.kwmen.createLabel(label).subscribe(res => {
        this.label = LabelFactory.empty();
        this.labelForm.reset(LabelFactory.empty());
        this.router.navigate(["/labels"], {relativeTo: this.route});
      });
    }
  }

  updateErrorMessages() {
    console.log("Is invalid? " + this.labelForm.invalid);
    this.errors = {};
    for (const message of LabelFormErrorMessages) {
      const control = this.labelForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid && control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }
}
