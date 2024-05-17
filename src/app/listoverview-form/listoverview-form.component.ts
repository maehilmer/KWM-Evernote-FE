import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {KwmevernoteStoreService} from "../shared/kwmevernote-store.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ListoverviewFactory} from "../shared/listoverview-factory";
import {ListoverviewFormErrorMessages} from "./listoverview-form-error-messages";
import {Listoverview} from "../shared/listoverview";

@Component({
  selector: 'kwmen-listoverview-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './listoverview-form.component.html',
  styles: ``
})
export class ListoverviewFormComponent {

  listoverviewForm: FormGroup;
  listoverview = ListoverviewFactory.empty(); // man muss sich nicht mit undefined herumschlagen und hat immer eine Notiz zur Hand
  errors: { [key: string]: string } = {};
  isUpdatingListoverview = false;

  constructor(
    private fb: FormBuilder,
    private kwmen: KwmevernoteStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.listoverviewForm = this.fb.group({});
  }

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    if (id) {
      this.isUpdatingListoverview = true;
      this.kwmen.getSingleListoverview(id).subscribe(listoverview => {
        this.listoverview = listoverview;
        this.initListoverview();
      });
    }
    this.initListoverview();
  }

  initListoverview() {
    this.listoverviewForm = this.fb.group({
      id: this.listoverview.id,
      title: [this.listoverview.title, Validators.required],
      isPublic: this.listoverview.isPublic
    });
    this.listoverviewForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());
  }

  submitForm() {

    const listoverview: Listoverview = ListoverviewFactory.fromObject(this.listoverviewForm.value);

    if (this.isUpdatingListoverview) {
      this.kwmen.updateListoverview(listoverview).subscribe(res => {
        this.router.navigate(["../../listoverviews", listoverview.id], {
          relativeTo: this.route
        });
      });
    } else {
      //listoverview.user_id = 1; // just for testing
      console.log(listoverview);
      this.kwmen.createListoverview(listoverview).subscribe(res => {
        this.listoverview = ListoverviewFactory.empty();
        this.listoverviewForm.reset(ListoverviewFactory.empty());
        this.router.navigate(["/listoverviews"], {relativeTo: this.route});
      });
    }
  }

  updateErrorMessages() {
    console.log("Is invalid? " + this.listoverviewForm.invalid);
    this.errors = {};
    for (const message of ListoverviewFormErrorMessages) {
      const control = this.listoverviewForm.get(message.forControl);
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
