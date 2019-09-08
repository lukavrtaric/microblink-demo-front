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
  statusMessage = "";

  constructor(
    private dialogRef: MatDialogRef<DialogScanDeletedComponent>,
    private ss: ScanService,
    private fbs: FirebaseService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  close = () => {
    this.dialogRef.close();
  }

  deleteScan = (id: string) => {
    this.ss.delete(id).subscribe((res) => {
      if (res.status) {
        if (this.firestore) {
          this.fbs.deleteScanData(res.data._id);
        }
  
        if (this.firestorage) {
          this.fbs.deleteImageData(res.data._id);
        }

        this.close();
      } else {
        this.statusMessage = res.status.message;
      }
    });
  }

  ngOnInit() {}

}
