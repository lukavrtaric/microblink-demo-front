import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CompleteMaterialModule } from './../material-module';

import { ScanRoutingModule } from './scan-routing.module';
import { ScanIdContainerComponent } from './../components/scan/scan-id/scan-id.container.component';
import { ScanIdComponent } from './../components/scan/scan-id/scan-id.component';
import { FormDataComponent } from './../components/scan/form-data/form-data.component';

@NgModule({
    imports: [
      ScanRoutingModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      CompleteMaterialModule,
      HttpClientModule
    ],
    declarations: [ 
      ScanIdContainerComponent,
      ScanIdComponent,
      FormDataComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class ScanModule { }