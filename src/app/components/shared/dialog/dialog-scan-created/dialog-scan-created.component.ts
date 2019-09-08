import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dialog-scan-created',
  templateUrl: './dialog-scan-created.component.html',
  styleUrls: ['./dialog-scan-created.component.less']
})
export class DialogScanCreatedComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DialogScanCreatedComponent>, 
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  close = () => {
    this.dialogRef.close();
  }

  goToCollection = () => {
    this.dialogRef.close(this.router.navigate(['/collection']));
  }

  ngOnInit() {}

}
