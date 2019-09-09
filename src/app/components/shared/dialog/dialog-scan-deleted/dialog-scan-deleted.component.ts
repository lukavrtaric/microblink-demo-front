import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ScanService } from './../../../../services/scan.service';
import { FirebaseService } from './../../../../services/firebase.service';

@Component({
  selector: 'app-dialog-scan-deleted',
  templateUrl: './dialog-scan-deleted.component.html',
  styleUrls: ['./dialog-scan-deleted.component.less']
})
export class DialogScanDeletedComponent implements OnInit {

  firestore = false;
  firestorage = false;
  statusMessage = null;
  firestoreLoading = false;
  firestorageLoading = false;
  firestoreSuccess = false;
  firestorageSuccess = false

  constructor(
    private dialogRef: MatDialogRef<DialogScanDeletedComponent>,
    private ss: ScanService,
    private fbs: FirebaseService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  close = (event) => {
    this.dialogRef.close(event);
  }

  deleteScan = (id: string) => {
    this.ss.delete(id).subscribe((res) => {
      if (res.status) {
        if (this.firestore) {
          this.firestoreLoading = true;
          this.fbs.deleteScanData(res.data._id)
            .then(res => {
              this.firestoreLoading = false;
              this.firestoreSuccess = true;
              if (!this.firestorage) {
                setTimeout(() => {
                  this.close('deleted')
                }, 1000);
              }
            })
            .catch(err => {
              console.error(err);
            });
        }
  
        if (this.firestorage) {
          this.firestorageLoading = true;
          this.fbs.deleteImageData(res.data._id)
            .then(res => {
              this.firestorageLoading = false;
              this.firestorageSuccess = true;
              setTimeout(() => {
                this.close('deleted')
              }, 1000);
            })
            .catch(err => {
              console.error(err);
            });
        }

        if (!(this.firestorage && this.firestore))
        {
          setTimeout(() => {
            this.close('deleted')
          }, 500);
        }
      } else {
        this.statusMessage = res.status.message;
      }
    });
  }

  ngOnInit() {}

}
