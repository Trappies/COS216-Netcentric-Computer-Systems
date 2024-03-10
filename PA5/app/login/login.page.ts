import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    api_key: string;
    user_id?: string;
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string;
  password: string;

  constructor(private router: Router, private http: HttpClient, private toastController: ToastController) {
    this.username = '';
    this.password = '';
  }

  login() {
    const loginData = {
      email: this.username,
      password: this.password
    };

    const usernamedb = 'u22502883';
    const passworddb = 'Mopane123#';
    const auth = btoa(usernamedb + ':' + passworddb);
    const headers = new HttpHeaders().set('Authorization', 'Basic ' + auth);

    this.http.post<LoginResponse>('https://wheatley.cs.up.ac.za/u22502883/COS216/PA5/validate-login.php', loginData, { headers }).subscribe(
      (response: LoginResponse) => {
        if (response.success) {
          localStorage.setItem('api_key', response.data.api_key);
          this.presentToast("Succesfully Logged In");
          this.router.navigate(['/tabs/cars']);
        } else {
          alert(response.message);
        }
      },
      (error) => {
        console.error('Login request failed:', error);
        this.presentToast('An error occurred during login.');
      }
    );
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
