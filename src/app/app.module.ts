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
import { DialogScanCreatedComponent } from './components/shared/dialog/dialog-scan-created/dialog-scan-created.component';
import { DialogScanDeletedComponent } from './components/shared/dialog/dialog-scan-deleted/dialog-scan-deleted.component';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from '@angular/fire/storage';

import { environment } from "./../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    ScanCollectionComponent,
    DialogScanCreatedComponent,
    DialogScanDeletedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CompleteMaterialModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  entryComponents: [
    DialogScanCreatedComponent,
    DialogScanDeletedComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
