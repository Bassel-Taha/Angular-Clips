import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ModalComponent} from "../../shared/modal/modal.component";
import {ModalServiceService} from "../../Services/ModalService/modal-service.service";
import {IClip} from "../../models/IClip";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Dismiss, DismissOptions} from "flowbite";
import {ClipService} from "../../Services/ClipService/clip.service";
import {timer} from "rxjs";

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

//the boolean value to show the alert message while the video is being Edited
  inSubmission = false;

//the boolean value to show the alert message while the video is being Edited
  showUploadAlert = false;

  //the message to show while the video is being edited
  alertMessage = 'Please wait while the video is being edited...';

  //the boolean value to show the success message after uploading the video
  showUploadSuccess = false;

  //the boolean value to show the error message after uploading the video
  showUploadError = false;

  @Input() activeClib: IClip | null = null;

  public clipId = new FormControl('', {validators: [Validators.required], nonNullable: true});
  //using an object of options for the form control to make it nonnull-able and adding the validations
  public Title = new FormControl('', {validators: [Validators.required, Validators.minLength(3)], nonNullable: true})
  //the formGroup for the title forms
  public editFormGroup: FormGroup = new FormGroup({
    Title: this.Title,
    clipId: this.clipId
  });

  constructor(private _modalService: ModalServiceService, private _clipService: ClipService) {

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



  Submit() {
    this.showUploadAlert = true;
    this.inSubmission = true;
    //the options for the dismiss alert message
   const options: DismissOptions = {
     transition: 'transition-opacity',
     duration: 1000,
     timing: 'ease-out',
    };
   if (!this.activeClib)
   {
      return
   }
    this.activeClib.title = this.Title.value;
   try {
     this._clipService.UpdateClip(this.activeClib)
   }
   catch (e)
   {
     this.showUploadAlert = false;
      this.showUploadError = true;
      this.alertMessage = 'An error occurred while updating the video';
     const dismiss = new Dismiss(document.getElementById('alertFailed'), null, options, {id: 'alertFailed', override: true} );
     //the dismiss object to hide the alert message doesn't work correctly
      /*dismiss.hide()*/
     timer(1000).subscribe(() => {
       this.showUploadAlert = false;
       this.inSubmission = false;
       this.showUploadSuccess = false;
       this.showUploadError = false;
     })
   }
    this.showUploadAlert = false;
    this.showUploadSuccess = true;

    //the object to dismiss the alert message
    const dismiss = new Dismiss(document.getElementById('alertSuccess'),null, options , { id: 'alertSuccess' , override: true});
    /*dismiss.hide()*/
    timer(1000).subscribe(() => {
      this.showUploadAlert = false;
      this.inSubmission = false;
      this.showUploadSuccess = false;
      this.showUploadError = false;
    })
  }
}
