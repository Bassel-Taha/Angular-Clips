import {Component, OnDestroy, OnInit} from '@angular/core';
@Component({
  selector: 'app-clips-list',
  standalone: true,
  imports: [],
  templateUrl: './clips-list.component.html',
  styleUrl: './clips-list.component.css'
})
export class ClipsListComponent implements OnInit, OnDestroy{

  constructor() { }


  //todo: the error here is due to nodejs not supporting the window object
  //todo: to fix this error you need to add the condition to check if the window object is defined or not to be used only in the browser
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
        window.addEventListener('scroll' , this.handelScroll);
      }
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined'){
      window.removeEventListener('scroll', this.handelScroll)
    }
    }


   private handelScroll = () => {
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
