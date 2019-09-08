import { 
  Component, 
  OnInit, 
  Input, 
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ScanService } from './../../../services/scan.service';
import { FirebaseService } from './../../../services/firebase.service'; 
import MRTD from './../../../models/MRTD';
import { DialogScanCreatedComponent } from './../../shared/dialog/dialog-scan-created/dialog-scan-created.component';

@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormDataComponent implements OnInit {
  @Input() scanData: MRTD;

  constructor(
    private ss: ScanService, 
    private fbs: FirebaseService, 
    public dialog: MatDialog
  ) {}

  scanDataForm = new FormGroup({
    type: new FormControl('', Validators.required),
    secondaryID: new FormControl('', Validators.required),
    primaryID: new FormControl('', Validators.required),
    documentType: new FormControl('', Validators.required),
    documentNumber: new FormControl('', Validators.required),
    sex: new FormControl(''),
    nationality: new FormControl(''),
    dateOfBirth: new FormControl(''),
    dateOfExpiry: new FormControl(''),
    rawMRZString: new FormControl('', Validators.required)
  });

  createDate = (date: any) => {
    let year: string, month: string, day: string;

    year = date.year;
    month = (date.month < 10) ? '0' + date.month : date.month; 
    day = (date.day < 10) ? '0' + date.day : date.day;

    let dateString = year + '-' + month + '-' + day + 'T00:00:00';
    return new Date(dateString);
  }

  fllForm = (data: MRTD) => {
    // Not all scanned values were inserted in form, just these...
    this.scanDataForm.setValue({
      type: data.type,
      secondaryID: data.secondaryID,
      primaryID: data.primaryID,
      documentType: data.documentType,
      documentNumber: data.documentNumber,
      sex: data.sex,
      nationality: data.nationality,
      dateOfBirth: this.createDate(data.dateOfBirth),
      dateOfExpiry: this.createDate(data.dateOfExpiry),
      rawMRZString: data.rawMRZString
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // Fill form only if data exists and if there are changes
    if (changes.scanData.currentValue !== 'undefined' && changes.scanData.currentValue !== changes.scanData.previousValue) {
      this.fllForm(this.scanData);
    }
  }

  onSubmit() {
    // Store data to MongoDB
    let mongoSubscription = this.ss.create(this.scanDataForm.value).subscribe((scan: MRTD) => {
      if (scan) {
        let statuses = { firestore:{}, firestorage:{} };
        
        // Store data to Firebase firestore
        this.fbs.createScanData(scan)
          .then((res) => {
            statuses.firestore = {
              status: "OK",
              message: "Saved to FireStore"
            }
          })
          .catch(err => {
            statuses.firestore = {
              status: "ERROR",
              message: "Error occured during saving to FireStore"
            }
          });

        // Store image to Firebase firestorage
        this.fbs.createImageData(scan._id, this.scanData.fullDocumentImageBase64)
          .then(res => {
            statuses.firestorage = {
              status: "OK",
              message: "Saved to FireStorage"
            }
          })
          .catch(err => {
            statuses.firestorage = {
              status: "ERROR",
              message: "Error occured during saving to FireStorage"
            }
          });
        
        const dialogRef = this.dialog.open(DialogScanCreatedComponent, {
          data: statuses
        });

        dialogRef.afterClosed().subscribe(() => {
          this.scanDataForm.reset();
          mongoSubscription.unsubscribe();
        });
      } else {
        // Store to Mongo DB failed, unsubscribe
        mongoSubscription.unsubscribe();
      }
    });
  }

  ngOnInit() {}

}
