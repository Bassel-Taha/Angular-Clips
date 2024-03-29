import { Injectable } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {IClip} from "../../models/IClip";

@Injectable({
  providedIn: 'any'
})
export class ClipService {

  public ClipsCollection : AngularFirestoreCollection<IClip>

  constructor(private db : AngularFirestore) {
    this.ClipsCollection =  db.collection('Clips');
  }

  public async AddClip(clip : IClip) {
    await this.ClipsCollection.add(clip);
  }
}
