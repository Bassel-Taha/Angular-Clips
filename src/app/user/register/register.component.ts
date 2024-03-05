import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import {Dismiss} from "flowbite";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AuthService} from "../../Services/AuthService/auth.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    AngularFireAuthModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
//var to show or hide the status message
  status: boolean | null = null;
//var to hold the error message
  error?:null | string
  //var to disable the submit button during the submission
  onsubmition : boolean = false;

  //the registration FormGroup
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),

    email: new FormControl('', [Validators.required, Validators.email]),

    age: new FormControl('', [Validators.required, Validators.min(10)]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$')]),

    confirm_password: new FormControl('', [Validators.required]),

    phone_number: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11)])
  });

  constructor(private Auth: AuthService) {
  }

  async Register() {
      this.onsubmition = true;
      //using the auth service to create a new user
      let response =  await this.Auth.Register(this.registerForm);
      if (response.isSucces) {
        //the status to show the toast status message
        this.status = true;

        this.onsubmition = false;
        return
      }
      else
      {
        this.error = response.message;
        this.status = false;
        this.onsubmition = false;
        return
      }
  }

//function to dismiss the status message
  dismissaction ($event:HTMLElement){
    new Dismiss($event,null,   {
      transition: 'transition-opacity',
      duration: 500,
      timing: 'ease-out'}).hide()
    this.status = null;
  }
}
