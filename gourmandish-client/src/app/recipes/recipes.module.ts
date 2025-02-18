import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { TimeAgoPipe } from '../pipes/time-ago.pipe';
import { FavoritesComponent } from './favorites/favorites.component';

@NgModule({
  declarations: [
    RecipeFormComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailsComponent,
    TimeAgoPipe,
    FavoritesComponent,
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [RecipeListComponent],
})
export class RecipesModule {}
