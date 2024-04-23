import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AdvertisersListComponent } from "./components/advertisers-list/advertisers-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AdvertisersListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
}