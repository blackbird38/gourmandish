import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeFormResolver } from './services/recipe-form-resolver';

const routes: Routes = [
  {
    path: 'create-recipe',
    component: RecipeFormComponent,
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
    resolve: {
      resolverData: RecipeFormResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [RecipeFormResolver],
})
export class RecipesRoutingModule {}
