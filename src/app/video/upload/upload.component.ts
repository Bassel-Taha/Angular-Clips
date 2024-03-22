import { Component } from '@angular/core';
import {EventBlockerDirective} from "../../shared/directives/event-blocker.directive";

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    EventBlockerDirective
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {

}
