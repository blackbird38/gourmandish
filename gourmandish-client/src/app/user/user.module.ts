import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RecipesModule } from '../recipes/recipes.module';

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [CommonModule, UserRoutingModule, RecipesModule],
})
export class UserModule {}
