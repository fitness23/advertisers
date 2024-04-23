import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {

  private data = signal<boolean>(false);

  setDataSignal(val: boolean) {
    this.data.set(val);
  }

  get dataSignal() {
    return this.data();
  }
}