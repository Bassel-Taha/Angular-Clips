import {Injectable} from '@angular/core';
import {Dismiss} from "flowbite";
import {timer} from "rxjs";
import {AuthService} from "../AuthService/auth.service";

@Injectable({
  providedIn: 'any'
})
export class ToastService {

  show : boolean = false

  constructor(private auth: AuthService) {
  }

  showtoast()
  {
    this.show = true
  }
  async dismissaction($event: HTMLElement) {
      new Dismiss($event, null, {
        transition: 'transition-opacity',
        duration: 500,
        timing: 'ease-out'
      }).hide();
      let observable = timer(1000);
      observable.subscribe(() => {
        this.show = false
      })
  }
}
