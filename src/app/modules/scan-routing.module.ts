import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';

import { ScanIdContainerComponent } from './../components/scan/scan-id/scan-id.container.component';


const routes: Routes = [
    { 
        path: '', 
        component: ScanIdContainerComponent 
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScanRoutingModule {}