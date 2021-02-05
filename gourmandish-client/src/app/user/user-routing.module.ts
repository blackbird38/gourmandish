import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { NgModule } from '@angular/core';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RecipesModule } from '../recipes/recipes.module';
import { UserSettingsPageComponent } from './user-settings-page/user-settings-page.component';

const routes: Routes = [
  {
    path: 'profile-page/:id',
    component: ProfilePageComponent,
  },
  {
    path: 'user-settings-page/:id',
    component: UserSettingsPageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), RecipesModule],
  exports: [RouterModule],
})
export class UserRoutingModule {}
