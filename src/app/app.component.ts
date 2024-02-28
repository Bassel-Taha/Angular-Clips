import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UserModule} from "./user/user.module";
import {NavComponent} from "./nav/nav.component";
import {NgIf} from "@angular/common";
import {ModalServiceService} from "./Services/modal-service.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserModule, NavComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'AngularClips';
  showModal : boolean = true
  constructor(public _modalService : ModalServiceService) {

  }
  ngOnInit(): void {
    setInterval(()=> {
      this.showModal = !this.showModal;
      console.log(this._modalService.Modal)
    },1000)
  }
}
