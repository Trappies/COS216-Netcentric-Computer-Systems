import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompareCarPage } from './compare-car.page';

describe('CompareCarPage', () => {
  let component: CompareCarPage;
  let fixture: ComponentFixture<CompareCarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CompareCarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
