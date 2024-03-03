import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import {Dismiss, DismissInterface, DismissOptions, InstanceOptions} from "flowbite";
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

  status : boolean|null = null;

  registerForm = new FormGroup({
    name: new FormControl('' ,[ Validators.required , Validators.minLength(3)]),

    email: new FormControl('' ,[Validators.required, Validators.email]),

    age : new FormControl('' ,[Validators.required, Validators.min(10)]),

    password: new FormControl('' ,[
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$')]),

    confirm_password: new FormControl('' ,[Validators.required]),

    phone_number: new FormControl('' ,[
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11)])
  });
  constructor(private Auth : AngularFireAuth){
  }

  async Register() {
    try {
      let userCredential = await this.Auth.createUserWithEmailAndPassword(this.registerForm.value.email as string, this.registerForm.value.password as string)
      console.log(userCredential);
      this.status = true;
      this.toast();
    } catch (e) {
      console.log(e);
      this.status = false;
      this.toast();
    }

  }


  toast() {

    if (this.status === true) {
      // target element that will be dismissed
      const targetEl = document.getElementById('toast-danger ');
      // optional trigger element
      const triggerEl = document.getElementById('TasterDangerDismiss');
      const options: DismissOptions = {
        transition: 'transition-opacity',
        duration: 1000,
        timing: 'ease-out',

        // callback functions
        onHide: (context, targetEl) => {
          console.log('element has been dismissed')
          console.log(targetEl)
        }
      };

      // instance options object
      const instanceOptions: InstanceOptions = {
        id: 'targetElement',
        override: true
      };

      /*
      * $targetEl (required)
      * $triggerEl (optional)
      * options (optional)
      * instanceOptions (optional)
      */
      const dismiss: DismissInterface = new Dismiss(targetEl, triggerEl, options, instanceOptions);

// programmatically hide it
      dismiss.hide();
    } else if (this.status === false) {
      const targetEl = document.getElementById('toast-success ');

      const triggerEl = document.getElementById('TasterSuccessDismiss');
      const options: DismissOptions = {
        transition: 'transition-opacity',
        duration: 1000,
        timing: 'ease-out',

        // callback functions
        onHide: (context, targetEl) => {
          console.log('element has been dismissed')
          console.log(targetEl)
        }
      };

      // instance options object
      const instanceOptions: InstanceOptions = {
        id: 'targetElement',
        override: true
      };

      /*
      * $targetEl (required)
      * $triggerEl (optional)
      * options (optional)
      * instanceOptions (optional)
      */
      const dismiss: DismissInterface = new Dismiss(targetEl, triggerEl, options, instanceOptions);

      // programmatically hide it
      dismiss.hide();
    }
  }
}
