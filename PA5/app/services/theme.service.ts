import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkModeSubject: BehaviorSubject<boolean>;

  constructor() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    this.darkModeSubject = new BehaviorSubject<boolean>(darkMode);
  }

  setDarkMode(enabled: boolean): void {
    localStorage.setItem('darkMode', enabled ? 'true' : 'false');
    this.darkModeSubject.next(enabled);
  }

  isDarkModeEnabled(): boolean {
    return this.darkModeSubject.value;
  }

  get darkMode$(): BehaviorSubject<boolean> {
    return this.darkModeSubject;
  }
}
