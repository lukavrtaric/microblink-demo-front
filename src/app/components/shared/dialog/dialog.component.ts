import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router"

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.less']
})
export class DialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogComponent>, private router: Router) { }

  close = () => {
    this.dialogRef.close();
  }

  goToCollection = () => {
    this.dialogRef.close(this.router.navigate(['/collection']));
  }

  ngOnInit() {
  }

}
