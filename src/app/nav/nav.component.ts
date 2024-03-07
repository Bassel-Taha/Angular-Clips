import {Component, OnInit} from '@angular/core';
import {ModalServiceService} from "../Services/ModalService/modal-service.service";
import {AuthService} from "../Services/AuthService/auth.service";
import {AsyncPipe} from "@angular/common";
import {ToastService} from "../Services/Toast/toast.service";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  constructor(public _ModalService: ModalServiceService , public Auth : AuthService, private toast : ToastService) {
  }

  ngOnInit(): void {

    }

  OpenModal($event : Event) {
    $event.preventDefault();
    this._ModalService.togelVisibility('auth');

  }
  SignOut()
  {
    this.Auth.SignOut()
    this.toast.show = true;
    return false
  }
}
