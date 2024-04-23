import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from "../../services/http.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormData } from '../../interfaces/form-data-interface';
import { NotifyService } from "../../services/notify.service";

@Component({
  selector: 'app-add-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.scss'
})
export class AddModalComponent implements OnInit, OnDestroy {

  constructor(
    private httpService: HttpService,
    private fBuilder: FormBuilder,
    private notifyService: NotifyService
    ) { }

  private sendDataSubscription = new Subscription();
  myForm: FormGroup = this.fBuilder.group({});
  @Output() statusEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.myForm = this.fBuilder.group({
      ['name']: [null, [Validators.required]],
      ['url']: [null, [Validators.required]],
      ['telephone']: [null, [Validators.required]],
      ['address']: [null, [Validators.required]],
      ['city']: [null, [Validators.required]],
      ['postcode']: [null, [Validators.required]]
    });
  }

  ngOnDestroy() {
    this.sendDataSubscription.unsubscribe();
  }

  closeModal() {
    this.statusEvent.emit(false);
  }

  save(formValues: FormData) {

    console.log(formValues);

    // Make a deep copy of the formValues because when I add the id later I don't want to be affecting the reactiveform values (immutabiity)
    let formValuesToBeSent = structuredClone(formValues);
  
    if (this.myForm.valid) {
      this.sendDataSubscription.add(
        this.httpService.submitFormAdvertisers(formValuesToBeSent).pipe(
          switchMap((id) => {

            // After the first POST request, the api will return the id of the newly added advertiser. In this case it is hard-coded to 6
            // Now add that id to the payload to send to the addresses api. For simplicity I'm sending the full details to both apis as Back End will usually ignore anything it doesn't need
            formValuesToBeSent.id = id;
            
            // Perform the second POST request with updated form data
            return this.httpService.submitFormAddresses(formValuesToBeSent);
          })
        ).subscribe({
          next: (data) => {

            console.log('Second POST request successful:', data);

            // Now close the modal down
            this.statusEvent.emit(false);

            // Using signals, show the notify message via a service on the list component
            this.notifyService.setDataSignal(true);
            
          },
          error: (err) => {
            console.error('Second POST request error:', err);
          }
        })
      );
    }
  }

}