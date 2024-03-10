import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

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
}

@Component({
  selector: 'app-find-car',
  templateUrl: './find-car.page.html',
  styleUrls: ['./find-car.page.scss']
})
export class FindCarComponent {
  filteredCars: Car[] | null = null;

  make: string = '';
  maxSpeed: number | null = null;
  bodyType: string = '';
  engineType: string = '';
  transmission: string = '';
  driveWheels: string = '';
  yearFrom: number | null = null;

  constructor(private http: HttpClient) {}

  filterCars() {
    const api_key = localStorage.getItem('api_key');
    const username = 'u22502883';
    const password = 'Mopane123#';
    const auth = btoa(username + ':' + password);
    const headers = new HttpHeaders().set('Authorization', 'Basic ' + auth);

    this.http
      .post<any>('https://wheatley.cs.up.ac.za/u22502883/COS216/api.php', {
        studentnum: 'u22502883',
        type: 'GetAllCars',
        limit: 100,
        apikey: api_key,
        search: {
          make: this.make,
          max_speed_km_per_h: this.maxSpeed,
          body_type: this.bodyType,
          engine_type: this.engineType,
          transmission: this.transmission,
          drive_wheels: this.driveWheels,
          year_from: this.yearFrom,
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
          'image',
        ],
      }, { headers })
      .subscribe(
        (response) => {
          if (response.success) {
            this.filteredCars = response.data.map((car: Car) => ({
              ...car,
              showDetails: false,
            }));
          } else {
            console.error('Error fetching cars:', response.message);
          }
        },
        (error) => {
          console.error('Error fetching cars:', error);
        }
      );
  }

  toggleCardDetails(car: Car) {
    car.showDetails = !car.showDetails;
  }
}
