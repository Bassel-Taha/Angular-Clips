import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ModalComponent} from "../../shared/modal/modal.component";
import {ModalServiceService} from "../../Services/ModalService/modal-service.service";

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    ModalComponent
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

  //the modal id for the clip editing
  modalId = 'editClipModal';

  constructor(private _modalService: ModalServiceService) {

  }

  ngOnInit(): void {
    this._modalService.Register(this.modalId);
  }

  ngOnDestroy(): void {
    this._modalService.UnRegister(this.modalId);
    }

  ngOnChanges(changes: SimpleChanges): void {

    }

}
