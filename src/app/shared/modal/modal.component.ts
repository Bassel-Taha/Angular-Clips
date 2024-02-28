import {Component, ElementRef, Input, OnInit} from '@angular/core';
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

  @Input() ModalId! : string;

  constructor(public _modalService : ModalServiceService, public ElRef : ElementRef) {
  }

  ngOnInit(): void {
    document.body.appendChild(this.ElRef.nativeElement);

    }

}
