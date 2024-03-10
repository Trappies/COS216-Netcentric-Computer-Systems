import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindCarComponent } from './find-car.page';

const routes: Routes = [
  {
    path: '',
    component: FindCarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindCarPageRoutingModule {}
