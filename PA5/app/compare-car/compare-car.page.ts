import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { ComparisonReportComponent } from '../comparison-report/comparison-report.component';


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
  [key: string]: any;
}

interface ComparisonResult {
  max_speed: {
    max: number;
    min: number;
    bestCar: Car;
    worstCar: Car;
  };
  year_from: {
    max: number;
    min: number;
    bestCar: Car;
    worstCar: Car;
  };
}

@Component({
  selector: 'app-compare-car',
  templateUrl: './compare-car.page.html',
  styleUrls: ['./compare-car.page.scss']
})
export class CompareCarComponent {
  searchQuery: string = '';
  showSuggestions: boolean = false;
  searchSuggestions: Car[] = [];
  selectedCars: Car[] = [];
  comparisonResult: ComparisonResult | null = null;

  constructor(private http: HttpClient, private modalController: ModalController) {}

  updateSuggestions() {
    if (this.searchQuery.length >= 2) {
      this.fetchSearchSuggestions();
      this.showSuggestions = true;
    } else {
      this.searchSuggestions = [];
      this.showSuggestions = false;
    }
  }

  fetchSearchSuggestions() {
    const api_key = localStorage.getItem('api_key');
    const username = 'u22502883';
    const password = 'Mopane123#';
    const auth = btoa(username + ':' + password);
    const headers = new HttpHeaders().set('Authorization', 'Basic ' + auth);

    this.http
      .post<any>('https://wheatley.cs.up.ac.za/u22502883/COS216/api.php', {
        studentnum: 'u22502883',
        type: 'GetAllCars',
        limit: 2000,
        apikey: api_key,
        search: {
          make: this.searchQuery,
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
            this.searchSuggestions = response.data.map((car: Car) => ({
              ...car,
              showDetails: false,
            }));
          } else {
            console.error('Error fetching search suggestions:', response.message);
          }
        },
        (error) => {
          console.error('Error fetching search suggestions:', error);
        }
      );
  }

  selectCar(car: Car) {
    this.selectedCars.push(car);
    this.searchQuery = '';
    this.showSuggestions = false;
  }

  compareCars() {
    if (this.selectedCars.length === 2) {
      this.comparisonResult = {
        max_speed: {
          max: Math.max(this.selectedCars[0].max_speed_km_per_h, this.selectedCars[1].max_speed_km_per_h),
          min: Math.min(this.selectedCars[0].max_speed_km_per_h, this.selectedCars[1].max_speed_km_per_h),
          bestCar: this.selectedCars[0].max_speed_km_per_h > this.selectedCars[1].max_speed_km_per_h
            ? this.selectedCars[0]
            : this.selectedCars[1],
          worstCar: this.selectedCars[0].max_speed_km_per_h < this.selectedCars[1].max_speed_km_per_h
            ? this.selectedCars[0]
            : this.selectedCars[1],
        },
        year_from: {
          max: Math.max(this.selectedCars[0].year_from, this.selectedCars[1].year_from),
          min: Math.min(this.selectedCars[0].year_from, this.selectedCars[1].year_from),
          bestCar: this.selectedCars[0].year_from > this.selectedCars[1].year_from
            ? this.selectedCars[0]
            : this.selectedCars[1],
          worstCar: this.selectedCars[0].year_from < this.selectedCars[1].year_from
            ? this.selectedCars[0]
            : this.selectedCars[1],
        },
      };

      this.openComparisonReport();
    } else {
      this.comparisonResult = null;
    }
  }


  async openComparisonReport() {
    const modal = await this.modalController.create({
      component: ComparisonReportComponent,
      componentProps: {
        comparisonResult: this.comparisonResult
      }
    });

    await modal.present();
  }

}
