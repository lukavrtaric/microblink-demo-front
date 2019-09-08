import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import MRTD from '../models/MRTD';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore, private firestorage: AngularFireStorage) { }

  createScanData = (data: MRTD) => {
    return new Promise<any>((resolve, reject) =>{
      this.firestore
        .collection("scans")
        .doc(data._id.toString())
        .set(data)
        .then(res => resolve(res), err => reject(err));
    });
  }

  createImageData = (id: any, data: any) => {
    return new Promise<any>((resolve, reject) => {
      let storageRef = this.firestorage.storage.ref('/images').child(id);
      storageRef
        .putString(data, 'base64', {contentType:'image/jpg'})
        .then(res => resolve(res), err => reject(err));
    });
  }

  getImageData = (id: any) => {
    return new Promise<any>((resolve, reject) => {
      let storageRef = this.firestorage.storage.ref('/images').child(id);
      storageRef
        .getDownloadURL()
        .then(url => resolve(url), err => reject(err));
    })
  }

  deleteScanData = (id: string) => {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("scans")
        .doc(id)
        .delete()
        .then(res => resolve(res), err => reject(err));
    });
  }

  deleteImageData = (id: string) => {
    return new Promise<any>((resolve, reject) => {
      let storageRef = this.firestorage.storage.ref('/images').child(id);
      storageRef
        .delete()
        .then(res => resolve(res), err => reject(err));

    });
  }
}
