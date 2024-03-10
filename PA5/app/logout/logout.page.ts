import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'translateY(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class LogoutPage {
  showConfirmation = false;
  slideAnimationState = 'hide';

  constructor(private router: Router, private toastController: ToastController) {}

  confirmLogout() {
    if (this.showConfirmation) {
      // Clear any user-related data or tokens from local storage or session storage
      localStorage.removeItem('api_key');

      // Redirect to the login page
      this.router.navigate(['/login']);
      this.presentToast("User Logged Out");
    } else {
      this.showConfirmation = true;
      this.slideAnimationState = 'show';
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'dark'
    });
    toast.present();
  }
}
