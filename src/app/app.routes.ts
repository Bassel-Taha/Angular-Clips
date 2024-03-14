import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {ManageComponent} from "./video/manage/manage.component";
import {ClipsComponent} from "./clips/clips.component";

export const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: "clip/:id", component:ClipsComponent , data: {AuthOnly : true}
  }
];
