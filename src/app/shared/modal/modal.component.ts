import {Component, OnInit} from '@angular/core';
import {AuthModalComponent} from "../../user/auth-modal/auth-modal.component";
import {ModalServiceService} from "../../Services/modal-service.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NgClass

  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit{
  constructor(public _modalService : ModalServiceService) {

  }

  ngOnInit(): void {

    }

}
