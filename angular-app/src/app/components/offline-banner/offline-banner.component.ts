import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offline-banner',
  templateUrl: './offline-banner.component.html',
  styleUrls: ['./offline-banner.component.scss']
})
export class OfflineBannerComponent implements OnInit {
  isOnline: boolean;

  constructor() {}

  ngOnInit() {
    this.isOnline = navigator.onLine;

    // Update `this.isOnline` state when "online"/"offline" events are fired
    window.addEventListener('online', () => {
      this.isOnline = true;
    });
    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }
}
