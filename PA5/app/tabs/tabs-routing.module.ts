import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'cars',
        loadChildren: () =>
          import('../car/car.module').then(m => m.CarPageModule)
      },
      {
        path: 'search',
        loadChildren: () =>
          import('../search/search.module').then(m => m.SearchPageModule)
      },
      {
        path: 'logout',
        loadChildren: () =>
          import('../logout/logout.module').then(m => m.LogoutPageModule)
      },
      {
        path: 'findCar',
        loadChildren: () =>
          import('../find-car/find-car.module').then(m => m.FindCarPageModule)
      },
      {
        path: 'compareCar',
        loadChildren: () =>
          import('../compare-car/compare-car.module').then(m => m.CompareCarPageModule)
      },
      {
        path: '',
        redirectTo: 'cars', // Update the redirect path to 'cars'
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/cars', // Update the redirect path to 'tabs/cars'
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
