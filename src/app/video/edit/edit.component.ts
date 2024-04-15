import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ModalComponent} from "../../shared/modal/modal.component";
import {ModalServiceService} from "../../Services/ModalService/modal-service.service";
import {IClip} from "../../models/IClip";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    ModalComponent,
    ReactiveFormsModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

  //the modal id for the clip editing
  modalId = 'editClipModal';

  @Input() activeClib: IClip | null = null;

  public clipId = new FormControl('', {validators: [Validators.required], nonNullable: true});
  //using an object of options for the form control to make it nonnull-able and adding the validations
  public Title = new FormControl('', {validators: [Validators.required, Validators.minLength(3)], nonNullable: true})
  //the formGroup for the title forms
  public editFormGroup: FormGroup = new FormGroup({
    Title: this.Title,
    clipId: this.clipId
  });

  constructor(private _modalService: ModalServiceService) {

  }

  ngOnInit(): void {
    this._modalService.Register(this.modalId);
  }

  ngOnDestroy(): void {
    this._modalService.UnRegister(this.modalId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.activeClib) {
      return
    }
    this.Title.setValue(this.activeClib.title)
    this.clipId.setValue(this.activeClib.docId?? 'not assigned for this video')
    this.clipId.disable()
  }

}
