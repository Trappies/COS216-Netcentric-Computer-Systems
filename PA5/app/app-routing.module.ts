import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./search/search.module').then(m => m.SearchPageModule)
  },
  {
    path: 'find-car',
    loadChildren: () =>
      import('./find-car/find-car.module').then(m => m.FindCarPageModule)
  },
  {
    path: 'compare-car',
    loadChildren: () =>
      import('./compare-car/compare-car.module').then(m => m.CompareCarPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'car',
    loadChildren: () =>
      import('./car/car.module').then(m => m.CarPageModule)
  },
  {
    path: 'logout',
    loadChildren: () =>
      import('./logout/logout.module').then(m => m.LogoutPageModule)
  },
  {
    path: '**',
    redirectTo: 'tabs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
