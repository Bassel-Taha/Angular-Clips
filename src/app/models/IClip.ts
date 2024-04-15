import firebase from "firebase/compat";

export interface IClip {
  docId? : string;
  uid : string;
  displayName : string;
  title: string;
  fileName: string;
  url: string;
  TimeStamp : firebase.firestore.FieldValue
}
