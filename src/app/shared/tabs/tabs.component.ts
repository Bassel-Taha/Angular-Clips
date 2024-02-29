import {AfterContentChecked, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent implements  OnInit, AfterContentChecked{
  @Input() TabTitle: string = '';
  @Input() ActiveTab : boolean = false ;
  constructor() {
  }

  ngOnInit(): void {

    }

  ngAfterContentChecked(): void {

    }


}
