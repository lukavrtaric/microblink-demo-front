import { Component, OnInit } from '@angular/core';

import { ScanService } from './../../services/scan.service';
import { FirebaseService } from './../../services/firebase.service'; 
import MRTD from './../../models/MRTD';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { DialogScanDeletedComponent } from './../shared/dialog/dialog-scan-deleted/dialog-scan-deleted.component';

@Component({
  selector: 'app-scan-collection',
  templateUrl: './scan-collection.component.html',
  styleUrls: ['./scan-collection.component.less'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ScanCollectionComponent implements OnInit {

  dataSource;
  columnsToDisplay = ['secondaryID', 'primaryID', 'type', 'documentType', 'documentNumber'];
  columnsLabels = {
    secondaryID: 'First Name', 
    primaryID: 'Last Name', 
    type: 'Type', 
    documentType: 'Document Type', 
    documentNumber: 'Document Number'
  };
  expandedElement: MRTD | null;

  constructor(
    private ss: ScanService, 
    private fbs: FirebaseService,
    public dialog: MatDialog
  ) {}

  getAll = () => {
    let that = this;
    this.ss.getAll().subscribe((result) => {
      result.forEach(function(scan) {
        that.fbs
          .getImageData(scan._id)
          .then(image => {
            scan.fullDocumentImageBase64 = image;
          });
      });

      this.dataSource = result;
    });
  }

  delete = (id: string) => {
    const dialogRef = this.dialog.open(DialogScanDeletedComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAll();
    });
  }

  ngOnInit() {
    this.getAll();
  }

}
