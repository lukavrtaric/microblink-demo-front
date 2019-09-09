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
  
  // Build form and set validation config
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

  // Set and transform date from recieved OCR values
  // We need standard date object to disply it on mat datepicker component
  createDate = (date: any) => {
    let year: string, month: string, day: string;

    year = date.year;
    month = (date.month < 10) ? '0' + date.month : date.month; 
    day = (date.day < 10) ? '0' + date.day : date.day;

    let dateString = year + '-' + month + '-' + day + 'T00:00:00';
    return new Date(dateString);
  }

  // Fill form with OCR data received from Microblink
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
    console.log(this.scanDataForm.value);
    // Store data to MongoDB
    let mongoSubscription = this.ss.create(this.scanDataForm.value).subscribe((scan: MRTD) => {
      if (scan) {
        // Show status for each firebase service
        let statuses = { 
          firestore: {
            success: null,
            loading: true
          }, 
          firestorage: {
            success: null,
            loading:true
          }
        };
        
        // Store data to Firebase firestore
        this.fbs.createScanData(scan)
          .then((res) => { 
            statuses.firestore.success = true; 
            statuses.firestore.loading = false; 
          })
          .catch(err => { 
            statuses.firestore.success = false;
            statuses.firestore.loading = false; 
          });

        // Store image to Firebase firestorage
        this.fbs.createImageData(scan._id, this.scanData.fullDocumentImageBase64)
          .then((res) => { 
            statuses.firestorage.success = true; 
            statuses.firestorage.loading = false; 
          })
          .catch(err => { 
            statuses.firestorage.success = false;
            statuses.firestorage.loading = false; 
          });
        
        const dialogRef = this.dialog.open(DialogScanCreatedComponent, { data: statuses });

        // Process is finished, reset form and unsubscribe
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
