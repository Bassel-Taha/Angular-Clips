import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UserModule} from "./user/user.module";
import {NavComponent} from "./nav/nav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserModule, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularClips';
}
