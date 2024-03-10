import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { ThemeService } from '../services/theme.service';

interface Car {
  id_trim: string;
  make: string;
  model: string;
  max_speed_km_per_h: number;
  body_type: string;
  engine_type: string;
  transmission: string;
  drive_wheels: string;
  year_from: number;
  image: string;
  showDetails: boolean;
  rating: number;
}

@Component({
  selector: 'app-car',
  templateUrl: './car.page.html',
  styleUrls: ['./car.page.scss']
})
export class CarPage implements OnInit {
  cars: Car[] | null = null;
  isLoading = false;
  currentUserID: string | null = null; // Store the user_id

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    // this.fetchCurrentUser();
    this.fetchCars();
  }

  isDarkModeEnabled(): boolean {
    return this.themeService.isDarkModeEnabled();
  }

  fetchCars() {
    const api_key = localStorage.getItem('api_key');
    const username = 'u22502883';
    const password = 'Mopane123#';
    const auth = btoa(username + ':' + password);
    const headers = new HttpHeaders().set('Authorization', 'Basic ' + auth);

    this.http
      .post<any>(
        'https://wheatley.cs.up.ac.za/u22502883/COS216/api.php',
        {
          studentnum: 'u22502883',
          type: 'GetAllCars',
          limit: 20,
          apikey: api_key,
          search: {
            make: ''
          },
          fuzzy: true,
          sort: 'max_speed_km_per_h',
          order: 'DESC',
          return: [
            'id_trim',
            'make',
            'model',
            'max_speed_km_per_h',
            'body_type',
            'engine_type',
            'transmission',
            'drive_wheels',
            'year_from',
            'image'
          ]
        },
        { headers }
      )
      .subscribe(
        (response) => {
          if (response.success) {
            this.cars = response.data.map((car: Car) => ({
              ...car,
              showDetails: false
            }));
          } else {
            console.error('Error fetching cars:', response.message);
          }
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching cars:', error);
          this.isLoading = false;
        }
      );
  }

  refreshData(event: any) {
    setTimeout(() => {
      this.isLoading = false;
      this.fetchCars();
      if (event.target) {
        event.target.complete();
      }
      this.presentToast('Data refreshed successfully');
    }, 2000);
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

  toggleCardDetails(car: Car) {
    car.showDetails = !car.showDetails;
  }
}
