import {Component, importProvidersFrom, NgModule, Provider} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {UserModule} from "./user/user.module";
import {NavComponent} from "./nav/nav.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/compat/auth";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {ToastService} from "./Services/Toast/toast.service";
import {AuthService} from "./Services/AuthService/auth.service";
import {VideoRoutingModule} from "./video/video-routing.module";
import {VideoModule} from "./video/video.module";
import {AngularFireAuthGuard, AngularFireAuthGuardModule} from "@angular/fire/compat/auth-guard";

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
    AngularFireAuthModule,
    AsyncPipe,
    VideoModule,
    AngularFireAuthGuardModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'AngularClips';
  constructor( public toast:ToastService, public auth : AuthService) {
    AngularFireModule.initializeApp(environment.firebaseConfig);
  }
}
