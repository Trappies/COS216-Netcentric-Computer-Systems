import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { CompareCarComponent } from './compare-car.page';
import { ComparisonReportComponent } from '../comparison-report/comparison-report.component';
import { CompareCarPageRoutingModule } from './compare-car-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CompareCarPageRoutingModule
  ],
  declarations: [
    CompareCarComponent,
    ComparisonReportComponent,
  ],
})
export class CompareCarPageModule { }
