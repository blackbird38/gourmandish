import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CurentUserData } from 'src/app/auth/models/current-user-data.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes$: BehaviorSubject<any>;
  currentUserData: CurentUserData;
  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.recipes$ = this.recipeService.recipes$;
  }

  ngOnInit(): void {
    let userId: string;
    this.authService.currentUserData$.subscribe((userData) => {
      this.currentUserData = userData;
      if (this.currentUserData) {
        userId = this.currentUserData._id;
      }
    });

    if (this.route.snapshot.url[0].path === 'favorites') {
      this.recipeService.getLikedByUserId(userId).subscribe((res: any) => {});
      return;
    }

    if (this.route.snapshot.paramMap.get('userId')) {
      userId = this.route.snapshot.paramMap.get('userId');
    }

    if (userId) {
      this.recipeService.getByUserId(userId).subscribe((res: any) => {});
      return;
    }
    this.recipeService.getAll().subscribe((res: any) => {});
  }
}
