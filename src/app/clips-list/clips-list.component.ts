import {Component, OnDestroy, OnInit} from '@angular/core';
import {preserveWhitespacesDefault} from "@angular/compiler";

@Component({
  selector: 'app-clips-list',
  standalone: true,
  imports: [],
  templateUrl: './clips-list.component.html',
  styleUrl: './clips-list.component.css'
})
export class ClipsListComponent implements OnInit, OnDestroy{

  constructor() { }

  ngOnInit(): void {
    window.addEventListener('scroll' , this.handelScroll);
  }

  ngOnDestroy(): void {
        window.removeEventListener('scroll', this.handelScroll)
    }


  private handelScroll() {
    //destructuring the properties of the document object
    const {scrollTop , offsetHeight } = document.documentElement;
    const {innerHeight} = window;
    //calculating the bottom of the page
    let BottomOfPage = Math.round(scrollTop) + innerHeight === offsetHeight;
    //Bottom of the page and chenking if the
    if (BottomOfPage) {
      console.log('Bottom of the page')
    }
  }
}
