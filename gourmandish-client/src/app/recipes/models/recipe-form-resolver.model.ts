import { Recipe } from 'src/app/models/Recipe.model';

export interface RecipeFormResolverModel {
  header: string;
  button: string;
  recipe: Recipe;
}
