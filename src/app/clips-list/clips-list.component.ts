import {Component, Input, input, OnDestroy, OnInit} from '@angular/core';
import {ClipService} from "../Services/ClipService/clip.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-clips-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './clips-list.component.html',
  styleUrl: './clips-list.component.css'
})
export class ClipsListComponent implements OnInit, OnDestroy {

  @Input() Scrolable: boolean = true;

  constructor(public _clipsService: ClipService) {
    //calling the function when the component is initialized
    this._clipsService.GetClips();
  }


  //todo: the error here is due to nodejs not supporting the window object
  //todo: to fix this error you need to add the condition to check if the window object is defined or not to be used only in the browser
  ngOnInit() {

    if (this.Scrolable) {
      if (typeof window !== 'undefined') {
        window.addEventListener('scroll', this.handelScroll);
      }
    }
  }

  ngOnDestroy(): void {

    if (this.Scrolable) {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', this.handelScroll)
      }
    }
  }


  private handelScroll = () => {
    //destructuring the properties of the document object
    const {scrollTop, offsetHeight} = document.documentElement;
    const {innerHeight} = window;
    //calculating the bottom of the page
    let BottomOfPage = Math.round(scrollTop) + innerHeight === offsetHeight;
    //Bottom of the page and chenking if the
    if (BottomOfPage) {
      //calling the function to get the clips again when the user reaches the bottom of the page
      this._clipsService.GetClips();
      console.log('GetClips Got Called From the Service')
    }
  }
}
