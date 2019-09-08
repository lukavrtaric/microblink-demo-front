import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { environment } from './../../../../environments/environment';
import MRTD from "./../../../models/MRTD";
import { Observable } from 'rxjs';

// There is no exposed Microblink SDK module inside microblink NPM package, at least I couldn't find one
// CDN import used instead
declare const Microblink: any;

@Component({
  selector: 'app-scan-id',
  templateUrl: './scan-id.container.component.html',
  styleUrls: []
})
export class ScanIdContainerComponent implements OnInit {

  // Only one recognizer model (MRTD) is created for testing
  scanData: MRTD;

  constructor(private cd: ChangeDetectorRef) {
    let that = this;

    try {
      // Recognizer MRTD is fixed for test, should be some kind of checkbox list or dropdown menu
      Microblink.SDK.SetRecognizers(['MRTD']);
      // If scan is successfull use image from response for persisting data
      Microblink.SDK.SetExportImages(true);
      // Backend is used to actually send data for image analyzing (like proxy to microblink API service?)
      Microblink.SDK.SetEndpoint(environment.backendAPIUrl);
      Microblink.SDK.RegisterListener({
        onScanSuccess: (data: any) => {
          if (data && data.result['data'] !== null) {
            let recognizers = data.result['data'];

            recognizers.forEach(function(recognizer: any) {
              if (recognizer.result !== null) {
                that.scanData = recognizer.result;
                that.cd.detectChanges();
              }
            })
          }
        },
        onScanError: (err: any) => {
          console.error('Scan error', err);
        }
      });
    } catch(err) {
      console.error('Microblink SDK error', err);
    }
  }

  ngOnInit() {
    setTimeout(function () {
      document.querySelectorAll('.hide-until-component-is-loaded').forEach(function(element) {
          element.classList.remove('hide-until-component-is-loaded');
      })
    }, 1000)
  }

}