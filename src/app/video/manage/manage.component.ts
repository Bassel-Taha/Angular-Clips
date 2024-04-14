import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {ClipService} from "../../Services/ClipService/clip.service";
import {IClip} from "../../models/IClip";

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent implements OnInit {

  // the value of the sorting option that the user has selected and also the default value for it when loading the component
  VideoSort = '1';

  //array of the clips that the user has uploaded from the database
  Clips : IClip[] = [];

  constructor(private router : Router, private route : ActivatedRoute, private clipService : ClipService) {
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      this.VideoSort = params['sort'] === '2' ? params['sort'] : '1';
    } );

    // testing the getClips function in the service
    this.clipService.GetUserClips().subscribe((clips) => {
      this.Clips = clips;
      console.log(this.Clips);
    })
  }


  Sort(event : Event)
  {
    this.VideoSort = (event.target as HTMLInputElement).value;
    this.router.navigate([], {queryParams: {sort: this.VideoSort} , relativeTo: this.route});
  }

}

