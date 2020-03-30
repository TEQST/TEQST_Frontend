import { AlertManagerService } from './alert-manager.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InternetConnectionService {

  constructor(private alertService: AlertManagerService) {}

  public monitor(): void {
    // 1st, we set the correct status when the page loads
    if (!navigator.onLine) {
      this.setStatusOffline();
    }

    // now we listen for network status changes
    window.addEventListener('online', () => {
      this.setStatusOnline();
    });

    window.addEventListener('offline', () => {
      this.setStatusOffline();
    });
  }

  private setStatusOffline(): void {
    this.alertService.presentNoInternetAlert();
  }

  private setStatusOnline(): void {
    this.alertService.dismissNoInternetAlert();
  }
}
