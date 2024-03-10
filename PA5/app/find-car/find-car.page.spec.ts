import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindCarPage } from './find-car.page';

describe('FindCarPage', () => {
  let component: FindCarPage;
  let fixture: ComponentFixture<FindCarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FindCarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
