import { Injectable } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {IClip} from "../../models/IClip";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {retry, switchMap, of} from "rxjs";

@Injectable({
  providedIn: 'any'
})
export class ClipService {

  public ClipsCollection : AngularFirestoreCollection<IClip>

  constructor(private db : AngularFirestore, private _auth : AngularFireAuth) {
    this.ClipsCollection =  db.collection('Clips');

  }

  public async AddClip(clip : IClip){
    return await this.ClipsCollection.add(clip);
  }

  GetUserClips(){
    return this._auth.user.pipe(
      switchMap(user => {
      if (!user){
        return of([])
      }
      //query the database for the clips of the user that is logged in
      let query = this.ClipsCollection.ref.where('uid', '==', user.uid);
      //return the clips using the get function as the query won't return the clips from the query snapshot object
      return query.get().then((res) => {
        //using the map operator to return the data of the clips as an array of IClip objects
        return res.docs.map((doc) => {
          let storedClip : IClip =  doc.data() as IClip;
          storedClip.docId = doc.id;
          return storedClip;
        })
      })
      }
      )
    )
  }

//function to update the clip from the database
  async UpdateClip(clip : IClip ){
     return await this.ClipsCollection.doc(clip.docId).update(clip);
  }
}
