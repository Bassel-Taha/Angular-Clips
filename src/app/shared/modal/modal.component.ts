import { Component } from '@angular/core';
import {AuthModalComponent} from "../../user/auth-modal/auth-modal.component";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    AuthModalComponent
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

}
