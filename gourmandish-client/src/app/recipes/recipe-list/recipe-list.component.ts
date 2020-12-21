import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes$: BehaviorSubject<any>;
  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.recipes$ = this.recipeService.recipes$;
  }

  //TODO: resolver or something else
  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId')
      ? this.route.snapshot.paramMap.get('userId')
      : this.authService.getCurrentUserId();
    if (userId) {
      this.recipeService.getByUserId(userId).subscribe((recipes: any) => {});
      return;
    }
    this.recipeService.getAll().subscribe((recipes: any) => {});
  }
}
