import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';


@NgModule({
  declarations: [ProfilePageComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
