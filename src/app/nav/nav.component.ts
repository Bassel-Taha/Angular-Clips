import {Component, OnInit} from '@angular/core';
import {ModalServiceService} from "../Services/ModalService/modal-service.service";
import {AuthService} from "../Services/AuthService/auth.service";
import {AsyncPipe} from "@angular/common";

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
  constructor(public _ModalService: ModalServiceService , public Auth : AuthService) {
  }

  ngOnInit(): void {

    }

  OpenModal($event : Event) {
    $event.preventDefault();
    this._ModalService.togelVisibility('auth');

  }
}
