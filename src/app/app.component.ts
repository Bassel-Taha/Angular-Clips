import {Component, NgModule} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {UserModule} from "./user/user.module";
import {NavComponent} from "./nav/nav.component";
import {NgIf} from "@angular/common";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/compat/auth";

;


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UserModule,
    NavComponent,
    NgIf,
    AngularFireModule,
    AngularFireAuthModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'AngularClips';
  constructor() {
    AngularFireModule.initializeApp(environment.firebase);
  }
}
