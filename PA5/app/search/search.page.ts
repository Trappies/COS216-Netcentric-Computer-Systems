import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {
  searchTerm: string = '';
  isLoading: boolean = false;
  cars: any[] = [];

  constructor(private http: HttpClient) {}

  onSearch() {
    if (this.searchTerm.trim() === '') {
      this.cars = [];
      return;
    }

    this.isLoading = true;

    const api_key = localStorage.getItem('api_key');
    const username = 'u22502883';
    const password = 'Mopane123#';
    const auth = btoa(username + ':' + password);
    const headers = new HttpHeaders().set('Authorization', 'Basic ' + auth);

    const searchPayload = {
      studentnum: 'u22502883',
      type: 'GetAllCars',
      limit: 20000,
      apikey: api_key,
      search: {
        make: this.searchTerm.trim(),
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
    };

    this.http
      .post<any>('https://wheatley.cs.up.ac.za/u22502883/COS216/api.php', searchPayload, { headers })
      .subscribe(
        (response: any) => {
          this.cars = response.data;
          this.isLoading = false;
        },
        (error) => {
          console.log('Search request failed:', error);
          this.isLoading = false;
        }
      );
  }

  toggleCardDetails(car: any) {
    car.showDetails = !car.showDetails;
  }
}
