import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalComponent} from "../../shared/modal/modal.component";
import {ModalServiceService} from "../../Services/modal-service.service";
import {SharedModule} from "../../shared/shared.module";

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [
    ModalComponent,
    SharedModule,
  ],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.css'
})
export class AuthModalComponent implements OnInit , OnDestroy{
  constructor(public _modalService: ModalServiceService) {

  }

  ngOnInit(): void {
    this._modalService.Register('auth');
  }
  ngOnDestroy(): void {
    this._modalService.UnRegister('auth');
    }



}
