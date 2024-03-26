import {Component, OnInit} from '@angular/core';
import {EventBlockerDirective} from "../../shared/directives/event-blocker.directive";
import {NgClass, PercentPipe} from "@angular/common";
import {log} from "node:util";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {v4} from 'uuid';
import {concatMap, timer} from "rxjs";
import {Dismiss, DismissOptions} from "flowbite";
import {subscribe} from "node:diagnostics_channel";

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    EventBlockerDirective,
    NgClass,
    ReactiveFormsModule,
    PercentPipe
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnInit {

  // the property to store the state of the drop zone
  public isDragedOver: boolean = false;
  // the property to store the file dropped in the drop zone
  public dropedFile: File | null = null;
  //using an object of options for the form control to make it nonnull-able and adding the validations
  public Title = new FormControl('', {validators: [Validators.required, Validators.minLength(3)], nonNullable: true})
  //the formGroup for the title forms
  public TitleFormGroup: FormGroup = new FormGroup({Title: this.Title});

  public insubmition: boolean = false;
  public showAlert: boolean = false;
  public alertMessage: string = 'Please wait while the file is being uploaded...';
  public uploadPercentage: number = 0;

  constructor(private _store: AngularFireStorage) {
  }

  ngOnInit(): void {

  }

  // the function to store the file dropped in the drop zone and set the is-dragged-over to false
  StoreFile($event: DragEvent) {
    this.isDragedOver = false;

    //there is a problem with the browser to get the dropped files from the event to get it from the dataTransfer property of the event
    //we need to get the first file from the files array and store it in a separate property
    this.dropedFile = $event.dataTransfer?.files[0] ?? null;

    //check if the file is uploaded successfully and checking if it's a video file
    // the type of the file should be video/mp4 ====>> " that's a mime type for video with the mp4 formatting for any other mime type search the web for it"
    if (!this.dropedFile || this.dropedFile.type !== 'video/mp4') {
      this.dropedFile = null;
      return console.error('The file is not a video file');
    }
    this.Title.setValue(this.dropedFile.name.replace(/\.[^/.]+$/, ""));
  }

  UploadFile() {
    //creating a unique file name for the file to be uploaded
    const clipeFileName = v4();
    //the path to store the file in the storage bucket to make all the files in the same folder
    const clipPath = `clips/${clipeFileName}.mp4`;

    this.showAlert = true;
    this.insubmition = true;


    //uploading the file to the storage bucket using the Firebase storage service
    const uploadTask = this._store.upload(clipPath, this.dropedFile)
    uploadTask.percentageChanges().subscribe((progress) => {
        this.uploadPercentage = (progress as number / 100) ?? 0;
        if (progress === 100) {
          this.alertMessage = 'The file is uploaded successfully';

          const options: DismissOptions = {
            transition: 'transition-opacity',
            duration: 1000,
            timing: 'ease-out'
          };
          const targetElement = document.getElementById('alert');

          new Dismiss(targetElement, null, options).hide();
          timer(1000).subscribe(() => {
            this.showAlert = false;
            this.insubmition = false;
          });
        }
      }
    );
  }
}

