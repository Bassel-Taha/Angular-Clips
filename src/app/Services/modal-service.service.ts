import { Injectable } from "@angular/core";


interface IModal {
  id: string;
  Hidden: boolean;
}


@Injectable({
  providedIn: 'root'
})

export class ModalServiceService {

  private Modal : IModal[] = []  ;
  constructor() {

  }

   Register(id: string){
    this.Modal.push({id: id, Hidden: true});
  }

  togelVisibility(id : string){
  let hiddenValue :boolean =  !!this.Modal.find(x => x.id === id)?.Hidden ;
    console.log(this.Modal.find(x => x.id === id))
    console.log(this.Modal)
  this.Modal.find(x => x.id === id)!.Hidden = !hiddenValue;
  }

  getVisibility(id : string) : boolean{
    console.log(this.Modal);
    return this.Modal.find(x => x.id === id)!.Hidden;
  }
}
