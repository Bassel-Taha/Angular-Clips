import {Component, OnInit} from '@angular/core';
import {EventBlockerDirective} from "../../shared/directives/event-blocker.directive";
import {NgClass} from "@angular/common";
import {log} from "node:util";

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    EventBlockerDirective,
    NgClass
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnInit {

  // the property to store the state of the drop zone
  public isDragedOver: boolean = false;
  // the property to store the file dropped in the drop zone
  public dropedFile : File | null = null;

  constructor() {
  }

  ngOnInit(): void {

    }

    // the function to store the file dropped in the drop zone and set the is-dragged-over to false
  StoreFile($event: DragEvent)  {
    this.isDragedOver = false ;

    //there is a problem with the browser to get the dropped files from the event to get it from the dataTransfer property of the event
    //we need to get the first file from the files array and store it in a separate property
    this.dropedFile = $event.dataTransfer?.files[0] ?? null;

    //check if the file is uploaded successfully and checking if it's a video file
    // the type of the file should be video/mp4 ====>> " that's a mime type for video with the mp4 formatting for any other mime type search the web for it"
    if(!this.dropedFile || this.dropedFile.type !== 'video/mp4'){

      return console.error('The file is not a video file');
    }

    console.log(this.dropedFile);
  }
}
