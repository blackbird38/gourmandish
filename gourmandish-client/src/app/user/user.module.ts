import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RecipesModule } from '../recipes/recipes.module';
import { UserSettingsPageComponent } from './user-settings-page/user-settings-page.component';
import { DisplayUsersComponent } from './display-users/display-users.component';

@NgModule({
  declarations: [ProfilePageComponent, UserSettingsPageComponent, DisplayUsersComponent],
  imports: [CommonModule, UserRoutingModule, RecipesModule],
})
export class UserModule {}
