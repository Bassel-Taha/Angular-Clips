import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireAuthGuard, AngularFireAuthGuardModule} from "@angular/fire/compat/auth-guard";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VideoRoutingModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule
  ]
})
export class VideoModule { }
