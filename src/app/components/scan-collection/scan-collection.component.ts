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

  // Config for table
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

  // Get data from database fill the table with those data if exists
  getAll = () => {
    let that = this;
    // Since we get data from backend REST API, subscription to event is needed, async response (Observable)
    this.ss.getAll().subscribe((result) => {
      // For every result in database check firestorage for scan image
      // Image are stored with scan id as key, so we fetch by id
      result.forEach(function(scan) {
        // Subscirption to result is needed since we're getting data from firestorage, response is Promise
        that.fbs
          .getImageData(scan._id)
          .then(image => { scan.fullDocumentImageBase64 = image})
          .catch(err => { console.error(err) });
      });

      // All those data from mongoDB and firestorage save to dataSource variable
      this.dataSource = result;
    });
  }

  // Delete event is triggered, open dialog
  delete = (id: string) => {
    const dialogRef = this.dialog.open(DialogScanDeletedComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'deleted') {
        this.getAll();
      }
    });
  }

  // When component is initiated get data
  ngOnInit() {
    this.getAll();
  }

}
