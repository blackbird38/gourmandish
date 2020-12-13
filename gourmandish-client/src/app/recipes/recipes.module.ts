import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';


@NgModule({
  declarations: [RecipeFormComponent],
  imports: [
    CommonModule,
    RecipesRoutingModule
  ]
})
export class RecipesModule { }
