import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent, NotFoundComponent } from './components/default';
import { ScanCollectionComponent } from './components/scan-collection/scan-collection.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'scan',
    loadChildren: () => import('./modules/scan.module').then(m => m.ScanModule)
  },
  {
    path: 'collection',
    component: ScanCollectionComponent
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { 
    path: '**', 
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
