import {Component, OnInit} from '@angular/core';
import {ModalServiceService} from "../Services/modal-service.service";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  constructor(public _ModalService: ModalServiceService) {
  }

  ngOnInit(): void {

    }

  OpenModal($event : Event) {
    $event.preventDefault();
    this._ModalService.togelVisibility();

  }
}
