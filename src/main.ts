import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import firebase from 'firebase/compat/app';
import {environment} from "./environments/environment";



/////////////////////////// this is the main entry point for the application meaning that this is the first file that is executed when the application is started /////////////////////////

// Initialize Firebase on the scale of the entire application
firebase.initializeApp(environment.firebaseConfig);

//that a variable to stop the application from being initialized more than once
let isIntialized : boolean  = true;

  // here we are using the onAuthStateChanged method to check if the user is logged in or not before initializing the application
  // that means that the application will ask firebase to know if the user is logged in or not before initializing Angular
  firebase.auth().onAuthStateChanged((user) => {
    //check if the application is already initialized
    if(isIntialized) {
    bootstrapApplication(AppComponent, appConfig)
      .catch((err) => console.error(err));
      isIntialized = false;
    }
  });


