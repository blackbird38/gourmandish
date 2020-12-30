import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { RecipeService } from './recipes/services/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.authService.automaticSignIn();
  }

  onSearch(term) {
    this.recipeService.search(term).subscribe(); //TODO: unsubscribe
  }
}
