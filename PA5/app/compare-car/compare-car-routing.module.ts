import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompareCarComponent } from './compare-car.page';

const routes: Routes = [
  {
    path: '',
    component: CompareCarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompareCarPageRoutingModule {}
