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
  this.Modal.find(x => x.id === id)!.Hidden = !hiddenValue;
  }

  getVisibility(id : string) : boolean{
    return this.Modal.find(x => x.id === id)!.Hidden;
  }
}
