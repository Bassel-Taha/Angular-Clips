import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManageComponent} from "./manage/manage.component";
import {routes} from "../app.routes";
import {UploadComponent} from "./upload/upload.component";
import {AngularFireAuthGuard} from "@angular/fire/compat/auth-guard";
import {AuthGuard, redirectUnauthorizedTo} from "@angular/fire/auth-guard";


const redirectUnauthorizedToHome = () => redirectUnauthorizedTo('');
export const Videoroutes: Routes = [
  {path:'manage', component: ManageComponent , data:{ AuthOnly: true ,fireAuthGuard: redirectUnauthorizedToHome} , canActivate: [AuthGuard],},
  {path:'upload', component: UploadComponent , data:{ AuthOnly: true, fireAuthGuard: redirectUnauthorizedToHome}, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
