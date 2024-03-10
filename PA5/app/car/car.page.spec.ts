import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarPage } from './car.page';

describe('CarPage', () => {
  let component: CarPage;
  let fixture: ComponentFixture<CarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
