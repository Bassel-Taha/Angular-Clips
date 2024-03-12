import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent implements OnInit{
  constructor(private route : ActivatedRoute) {
  }
    ngOnInit(): void {
      this.route.data.subscribe(console.log)

    }

}
