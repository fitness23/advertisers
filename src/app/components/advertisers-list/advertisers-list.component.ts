import { Component, OnInit, signal } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { CommonModule } from '@angular/common';
import { AddModalComponent } from "./../add-modal/add-modal.component";
import { NotifyService } from "../../services/notify.service";

@Component({
  selector: 'app-advertisers-list',
  standalone: true,
  imports: [CommonModule, AddModalComponent],
  providers: [HttpService],
  templateUrl: './advertisers-list.component.html',
  styleUrl: './advertisers-list.component.scss'
})
export class AdvertisersListComponent implements OnInit {

  advertisers$ = this.httpService.getCombinedData();
  modalOpen = signal<boolean>(false);

  constructor(
    private httpService: HttpService,
    private notifyService: NotifyService
  ) { }

  ngOnInit(): void {

  }

  openModal(){
    this.modalOpen.set(true);
  }

  closeModal(data: boolean): void {
    this.modalOpen.set(data);
  }

  closeNotifcation(){
    this.notifyService.setDataSignal(false);
  }

  get notifyValue() {
    return this.notifyService.dataSignal;
  }

}