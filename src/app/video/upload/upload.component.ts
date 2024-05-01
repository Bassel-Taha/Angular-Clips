import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventBlockerDirective} from "../../shared/directives/event-blocker.directive";
import {NgClass, PercentPipe} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {v4} from 'uuid';
import {last, switchMap, timer, combineLatest} from "rxjs";
import {Dismiss, DismissOptions} from "flowbite";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import {ClipService} from "../../Services/ClipService/clip.service";
import {Router} from "@angular/router";
import {IClip} from "../../models/IClip";
import {FfmpegService} from "../../Services/FfmpegService/ffmpeg.service";

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

export class UploadComponent implements OnDestroy {

  // the property to store the state of the drop zone
  public isDragedOver: boolean = false;
  // the property to store the file dropped in the drop zone
  public dropedFile: File | null = null;
  //using an object of options for the form control to make it nonnull-able and adding the validations
  public Title = new FormControl('', {validators: [Validators.required, Validators.minLength(3)], nonNullable: true})
  //the formGroup for the title forms
  public TitleFormGroup: FormGroup = new FormGroup({Title: this.Title});
  //Ffmpeg Ready prop to check if the ffmpeg is ready to be used

  //the alert showing properties
  public insubmition: boolean = false;
  public showUploadAlert: boolean = false;
  public alertMessage: string = 'Please wait while the file is being uploaded...';
  public uploadPercentage: number = 0;
  public showUploadSuccess: boolean = false;
  public showUploadError: boolean = false;

  //the Upload Task property to cancel the task if the user exited the page during the Upload
  public uploadTask?: AngularFireUploadTask;

  //the Upload Task property to observe the upload process and  cancel the task if the user exited the page during the Upload
  public ScreenshotsUploadTask?: AngularFireUploadTask;

  //property to store the images URls in an array of strings
  public screenshots: string[] = [];

  //the user property to store the user data
  public user!: firebase.User | null

  //prop to store the selected screenshot from the dom
  public selectedScreenShot : string = "";



  constructor(private _store: AngularFireStorage,
              private auth: AngularFireAuth,
              private _clipservice: ClipService,
              private _router : Router,
              public FfmpegService: FfmpegService) {
    //getting the user data from the auth service to store it in the user property
    this.auth.user.subscribe(user => {
      this.user = user;
    })
    this.FfmpegService.Init();

  }

  ngOnDestroy(): void {
    //canceling the Upload if the component gor destroyed
    this.uploadTask?.cancel();
    }


  // the function to store the file dropped in the drop zone and set the is-dragged-over to false
  async StoreFile($event : any) {


    this.isDragedOver = false;

    //there is a problem with the browser to get the dropped files from the event to get it from the dataTransfer property of the event
    //we need to get the first file from the files array and store it in a separate property
    this.dropedFile = ($event as DragEvent).dataTransfer ?
      //checking if the file is dropped from the drag event or from the input file as both have different properties storing the file
                       ($event as DragEvent).dataTransfer?.files[0] ?? null :
                        ($event.target as HTMLInputElement).files?.item(0) ?? null ;

    //check if the file is uploaded successfully and checking if it's a video file
    // the type of the file should be video/mp4 ====>> " that's a mime type for video with the mp4 formatting for any other mime type search the web for it"
    if (!this.dropedFile || this.dropedFile.type !== 'video/mp4') {
      this.dropedFile = null;
      return console.error('The file is not a video file');
    }
    this.TitleFormGroup.disable();
    //saving the file to the ffmpeg memory to be used later
    this.screenshots =  await this.FfmpegService.GetScreenShotAsync(this.dropedFile);

    //setting the selected screenshot to the first screenshot and doing that here because if i did it while initializing the porp then the array would be empty
    this.selectedScreenShot = this.screenshots[0];

    //setting the title of the video to the name of the video file without the extension
    this.Title.setValue(this.dropedFile.name.replace(/\.[^/.]+$/, ""));
    this.TitleFormGroup.enable();
  }

  async UploadFile() {
    //disabling the form so that the user cant change the form after stating the upload
    this.TitleFormGroup.disable();
    //creating a unique file name for the file to be uploaded
    const clipeFileName = v4();
    //the path to store the file in the storage bucket to make all the files in the same folder
    const clipPath = `clips/${clipeFileName}.mp4`;
    //the path to store the screenshots in the storage bucket to make all the files in the same folder
    const ScreenshotsPath = `ScreenShots/${clipeFileName}.png`;

    //getting the screenshots as a blob from the Url of the snapshot using the functions created in ffmpeg service
    let blobOfTheSelectedScreenShot = await this.FfmpegService.GetBlobsFromUrlsAsync(this.selectedScreenShot);


    //setting the alert message and the insubmition to true to show the alert
    this.showUploadAlert = true;
    this.insubmition = true;


    //uploading the file to the storage bucket using the Firebase storage service
   this.uploadTask = this._store.upload(clipPath, this.dropedFile)

    //uploading the screenshots to the storage bucket using the Firebase storage service
    this.ScreenshotsUploadTask = this._store.upload(ScreenshotsPath, blobOfTheSelectedScreenShot);

    //creating clipRef to get the download URL of the file uploaded
    const clipRef = this._store.ref(clipPath);

    //the observable to get the percentage of the file uploaded
    //the percentage is the average between the percebtage of the video upload and the snapshot upload
    //using the cobinelatest to get the latest value of the percentage of the video and the screenshot upload and then calculating the average
    combineLatest([this.uploadTask.percentageChanges() , this.ScreenshotsUploadTask.percentageChanges()]).subscribe(([videoProgress , screenshotProgress])=>{
     //checking if the videoProgress or the screenshotProgress is null to avoid the error of the null value
      if (!videoProgress || !screenshotProgress)
     {
        return;
     }
      this.uploadPercentage = (videoProgress as number + screenshotProgress as number) / 200;
    })

    //the options for the dismiss alert message
    const options: DismissOptions = {
      transition: 'transition-opacity',
      duration: 900,
      timing: 'ease-out'
    };

    //showing the success alert
    this.uploadTask.snapshotChanges().pipe(last(), switchMap(() => {
      return clipRef.getDownloadURL()
    })).subscribe({

      //handling the success of the file uploaded successfully by showing the success alert
      next: async (url) => {
        let clip : IClip = {
          uid: this.user!.uid as string,
          displayName: this.user?.displayName as string,
          title: this.Title.value,
          fileName: clipPath,
          url: url,
          TimeStamp : firebase.firestore.FieldValue.serverTimestamp()
        }
        //adding the clip to the database
        let clipDocumentRef = await this._clipservice.AddClip(clip);
        timer(1000).subscribe(
          ()=>{
            this._router.navigate(['clip' , clipDocumentRef.id])
          },
        )

        //hiding the progress alert
        this.showUploadAlert = false;
        this.insubmition = false;

        //showing the success alert
        this.showUploadSuccess = true;
        //getting the target element to dismiss the alert message after 1 second
        const targetElement = document.getElementById('alertSuccess');
        let DismissElement =  new Dismiss(targetElement, null, options)
        DismissElement.hide();
        DismissElement.updateOnHide(() => {
          this.showUploadSuccess = false;
        });
        //using the timer observable to hide the alert message after 1 second
        this.TitleFormGroup.enable();
      },

      //handling the error if the file is not uploaded successfully by showing the error alert
      error: (error) => {
        console.error(error);
        //hidding the progress alert
        this.showUploadAlert = false;
        this.insubmition = false;
        //showing the error alert
        this.showUploadError = true;
        //getting the target element to dismiss the alert message after 1 second
        const targetElement = document.getElementById('alertError');
        let DismissElement = new Dismiss(targetElement, null, options);
        DismissElement.hide();
        DismissElement.updateOnHide(() => {
          this.showUploadError = false;
        });
        this.TitleFormGroup.enable();
      }
    });
  }
}
