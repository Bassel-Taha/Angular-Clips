import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManageComponent} from "./manage/manage.component";
import {routes} from "../app.routes";

export const Videoroutes: Routes = [
  {path:'manage', component: ManageComponent , data:{ AuthOnly: true}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
