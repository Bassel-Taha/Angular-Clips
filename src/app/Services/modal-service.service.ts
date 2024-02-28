import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  private Hidden : boolean = true;
  constructor() { }

  togelVisibility(){
    this.Hidden = !this.Hidden;
  }

  getVisibility() : boolean{
    return this.Hidden;
  }
}
