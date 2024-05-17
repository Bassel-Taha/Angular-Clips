import {Injectable} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {IClip} from "../../models/IClip";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {retry, switchMap, of, firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'any'
})
export class ClipService {
//creating a collection of clips
  public ClipsCollection: AngularFirestoreCollection<IClip>
//storing the loaded Clibs to keep track of the last clip to request the rest of the clips staring form the last clip
  public pageClibs: IClip[] = [];
  public pendingClipsRequest: boolean = false;

  constructor(private db: AngularFirestore, private _auth: AngularFireAuth, private _store: AngularFireStorage) {
    this.ClipsCollection = db.collection('Clips');

  }

  public async AddClip(clip: IClip) {
    return await this.ClipsCollection.add(clip);
  }

  GetUserClips() {
    return this._auth.user.pipe(
      switchMap(user => {
          if (!user) {
            return of([])
          }
          //query the database for the clips of the user that is logged in
          let query = this.ClipsCollection.ref.where('uid', '==', user.uid);
          //return the clips using the get function as the query won't return the clips from the query snapshot object
          return query.get().then((res) => {
            //using the map operator to return the data of the clips as an array of IClip objects
            return res.docs.map((doc) => {
              let storedClip: IClip = doc.data() as IClip;
              storedClip.docId = doc.id;
              return storedClip;
            })
          })
        }
      )
    )
  }

//function to update the clip from the database
  async UpdateClip(clip: IClip) {
    return await this.ClipsCollection.doc(clip.docId).update(clip);
  }

  //function to delete the clip from the database

  //todo : to delete the clip from the storage have to edit the rules in firebase to allow the authenticated user to delete the clip with put knowing the file size
  async DeleteClip(clip: IClip) {
    await this._store.refFromURL(clip.url).delete();
//getting the storage reference of the screenshot
    const screenshotref = this._store.ref(`ScreenShots/${clip.screenshotname}.png`)
    await this.ClipsCollection.doc(clip.docId).delete();
    await this.ClipsCollection.doc()
    //deleting the screenshot from the storage
    screenshotref.delete();
  }


  //function to get the clips from the database
  async GetClips() {

    //checking if there is a pending request
    if (this.pendingClipsRequest === true) {
      return
    }
    //setting the pending request to true
    this.pendingClipsRequest = true;
    //query the database for the clips and order them by the timestamp and limit the results to 6
    let query = this.ClipsCollection.ref.orderBy(`TimeStamp`, 'desc').limit(6);


    //getting the length of the loaded clips
    let {length} = this.pageClibs;
    console.log(`length is ${length}`)

    //checking if the length is greater than 0 to get the last clip snapshot to start the query from the last clip
    if (length) {
      let lastClipDocId = this.pageClibs[length - 1]?.docId;
      //get the last clip snapshot so that is can be used by the startAfter function to get the next 6 clips
      let lastClipSnapShot = await firstValueFrom(this.ClipsCollection.doc(lastClipDocId).get());
      //setting the query to start after the last clip snapshot
      console.log(lastClipSnapShot)
      query = query.startAt(lastClipSnapShot);
    }
    //getting the query snapshot
    let snapshot = await query.get();



    //pushing the snapshot to the pageClips array
    snapshot.forEach((doc) => {
        this.pageClibs.push({
          ...doc.data() as IClip,
          docId: doc.id
        })

    })

    //setting the pending request to false
    this.pendingClipsRequest = false;

  }
}
