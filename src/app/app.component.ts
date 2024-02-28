import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UserModule} from "./user/user.module";
import {NavComponent} from "./nav/nav.component";
import {NgIf} from "@angular/common";
import {ModalServiceService} from "./Services/modal-service.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserModule, NavComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularClips';
}
