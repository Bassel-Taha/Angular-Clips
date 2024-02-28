import { Component } from '@angular/core';
import {ModalComponent} from "../../shared/modal/modal.component";
import {ModalServiceService} from "../../Services/modal-service.service";

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [
    ModalComponent
  ],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.css'
})
export class AuthModalComponent {
  constructor(public _modalService: ModalServiceService) {
    this._modalService.Register('auth');
  }

}
