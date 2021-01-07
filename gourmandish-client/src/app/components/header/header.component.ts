import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CurentUserData } from 'src/app/auth/models/current-user-data.model';
import { RecipeService } from 'src/app/recipes/services/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  signedIn$: BehaviorSubject<boolean>;
  currentUserData: CurentUserData;
  @Output() onSearchEvent: EventEmitter<any> = new EventEmitter();
  @ViewChild('navBurger') navBurger: ElementRef;
  @ViewChild('navMenu') navMenu: ElementRef;

  constructor(
    private authService: AuthService,
    private recipeService: RecipeService,
    private router: Router
  ) {
    this.signedIn$ = this.authService.signedIn$;
    this.authService.currentUserData$.subscribe((userData) => {
      this.currentUserData = userData;
    });
  }

  ngOnInit(): void {}

  signOut() {
    this.authService.signOut();
    this.recipeService.cleanUp();
    this.router.navigate(['signin']);
  }

  searchRecipes(event: any) {
    this.onSearchEvent.emit(event.target.value);
    this.router.navigate(['recipe-list']);
  }

  toggleNavbar() {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
  }
}
