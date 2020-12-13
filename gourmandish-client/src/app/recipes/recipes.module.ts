import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipesRoutingModule } from './recipes-routing.module';

@NgModule({
  declarations: [RecipeFormComponent],
  imports: [CommonModule, RecipesRoutingModule],
})
export class RecipesModule {}
