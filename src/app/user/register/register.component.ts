import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

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
  constructor() {
  }

  Register(){
    console.log(this.registerForm.value);
  }
}
