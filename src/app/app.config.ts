import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../environments/environment.development";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {Videoroutes, VideoRoutingModule} from "./video/video-routing.module";
import {AuthGuardModule} from "@angular/fire/auth-guard";
import {AngularFireAuthGuard} from "@angular/fire/compat/auth-guard";

  export const appConfig: ApplicationConfig = {
  providers: [
    //must add all the routes to the providers for the server to work properly cuz im using the standalone project
    provideRouter(Videoroutes),
    //must put routes after the rest of the routes providers to as it will have the 404 error
    provideRouter(routes),
    provideClientHydration(),
  importProvidersFrom(
    provideFirebaseApp(()=>initializeApp(environment.firebaseConfig)),
    provideAuth(()=>getAuth()),
    provideFirestore(()=>getFirestore()),
    provideStorage(()=> getStorage()),

  )]
};
