import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ClipService} from "../Services/ClipService/clip.service";

@Component({
  selector: 'app-clips',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './clips.component.html',
  styleUrl: './clips.component.css'
})
export class ClipsComponent implements OnInit{
  id = ""

  constructor(private route:ActivatedRoute) {
  }

  ngOnInit(): void {
   this.route.params.subscribe(params => { this.id = params["id"] })

    }

}
