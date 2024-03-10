import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindCarPageRoutingModule } from './find-car-routing.module';

import { FindCarComponent } from './find-car.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindCarPageRoutingModule
  ],
  declarations: [FindCarComponent]
})
export class FindCarPageModule {}
