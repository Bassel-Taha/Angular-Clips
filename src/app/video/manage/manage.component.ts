import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";

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

  VideoSort = '1';
  constructor(private router : Router, private route : ActivatedRoute,  ) {
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      this.VideoSort = params['sort'] === '2' ? params['sort'] : '1';
    } );

  }


  Sort(event : Event)
  {
    this.VideoSort = (event.target as HTMLInputElement).value;
    this.router.navigate([], {queryParams: {sort: this.VideoSort} , relativeTo: this.route});
  }

}
