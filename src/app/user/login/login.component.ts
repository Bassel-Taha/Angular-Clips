import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, Form, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {Dismiss} from "flowbite";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {AuthService} from "../../Services/AuthService/auth.service";
import {ModalServiceService} from "../../Services/ModalService/modal-service.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginFrom = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',
      [Validators.required,
        Validators.minLength(6)
    ])});

  public status: boolean =  true;

 public  error : string | null = null;

  constructor(private auth : AuthService, private Modalservice : ModalServiceService) {

  }

  async login() {
   let response =  await this.auth.Login(this.loginFrom)
    if (response.isSucces) {
      this.status = true ;
      console.log(response.user)
      this.Modalservice.togelVisibility('auth');
      return
    }
    this.error = response.message;
    this.status = false;
    return
  }



  dismissaction ($event:HTMLElement){
    new Dismiss($event,null,   {
      transition: 'transition-opacity',
      duration: 500,
      timing: 'ease-out'}).hide()
    this.status = true;
  }

}

