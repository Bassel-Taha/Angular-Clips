import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import {Dismiss, DismissInterface, DismissOptions, initDismisses, InstanceOptions} from "flowbite";
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/compat/auth";

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

  status: boolean | null = null;

  error!:string

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

  constructor(private Auth: AngularFireAuth) {
  }

  async Register() {
    try {
      let userCredential = await this.Auth.createUserWithEmailAndPassword(this.registerForm.value.email as string, this.registerForm.value.password as string)
      console.log(userCredential.user);
      this.status = true;
      return
    } catch (e) {
      console.log(e);
       this.error = e as string;
      this.status = false;
      return
    }

  }

  dismissaction ($event:HTMLElement){
    new Dismiss($event,null,   {
      transition: 'transition-opacity',
      duration: 500,
      timing: 'ease-out'}).hide()
  }
}
