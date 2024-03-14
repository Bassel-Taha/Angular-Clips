import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-clips',
  standalone: true,
  imports: [],
  templateUrl: './clips.component.html',
  styleUrl: './clips.component.css'
})
export class ClipsComponent implements OnInit{
  id = ""

  constructor(private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]

    }

}
