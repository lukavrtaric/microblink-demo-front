import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { environment } from './../../../../environments/environment';
import MRTD from "./../../../models/MRTD";

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
  recognizers = ['MRTD'];

  constructor(private cd: ChangeDetectorRef) {
    let that = this;

    try {
      // Recognizer MRTD is fixed for test, should be some kind of checkbox list or dropdown menu
      Microblink.SDK.SetRecognizers(this.recognizers);
      // If scan is successfull use image from response for persisting data to FireStorage
      Microblink.SDK.SetExportImages(true);
      // Backend is used to actually send data for image analyzing (like proxy to microblink API service?)
      Microblink.SDK.SetEndpoint(environment.backendAPIUrl);
      Microblink.SDK.RegisterListener({
        onScanSuccess: (data: any) => {
          if (data && data.result['data'] !== null) {
            let recognizers = data.result['data'];

            // Loop through all recognizers, check if result exists
            // In this case looping is not needed cause only one recognizer is implemented (MRTD)
            recognizers.forEach(function(recognizer: any) {
              if (recognizer.result !== null) {
                // If scan data exists store into the MRTD abstraction model
                that.scanData = recognizer.result;
                // Send event to from data component cause scan data are available now
                // so fill the form with those data
                that.cd.detectChanges();
              }
            })
          }
        },
        onScanError: (err: any) => {
          // We should somehow handle this error by logging it and some fancy alert with message
          console.error('Scan error', err);
        }
      });
    } catch(err) {
      // We should somehow handle this error by logging it and some fancy alert with message
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