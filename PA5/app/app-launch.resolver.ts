import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppLaunchResolver implements Resolve<boolean> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // Simulate an asynchronous delay to check if the app has been launched
    return of(true) // Replace with your own logic to determine app launch status
      .pipe(
        delay(3000) // Adjust the delay duration as needed
      );
  }
}
