import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { FavoritesComponent } from './favorites/favorites.component';
import { NgModule } from '@angular/core';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeFormResolver } from './services/recipe-form-resolver';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

const routes: Routes = [
  {
    path: 'recipe-form',
    component: RecipeFormComponent,
    canActivate: [AuthGuard],
    resolve: {
      resolverData: RecipeFormResolver,
    },
  },
  {
    path: 'recipe-list',
    component: RecipeListComponent,
    children: [{ path: ':userId', component: RecipeListComponent }],
  },
  {
    path: 'edit-recipe/:id',
    component: RecipeFormComponent,
    canActivate: [AuthGuard],
    resolve: {
      resolverData: RecipeFormResolver,
    },
  },
  {
    path: 'recipe-details/:id',
    component: RecipeDetailsComponent,
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [RecipeFormResolver, AuthGuard],
})
export class RecipesRoutingModule {}
