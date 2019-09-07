import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'

import { CompleteMaterialModule } from './material-module';
import { HomeComponent } from './components/default/home/home.component';
import { NotFoundComponent } from './components/default/not-found/not-found.component';
import { ScanCollectionComponent } from './components/scan-collection/scan-collection.component';
import { DialogComponent } from './components/shared/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    ScanCollectionComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CompleteMaterialModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
