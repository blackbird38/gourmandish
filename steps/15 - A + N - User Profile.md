ng g m User --routing
ng g c user/ProfilePage

add module in app module

in user.module: `imports: [CommonModule, UserRoutingModule, RecipesModule]`,

in recipes.module: `exports: [RecipeListComponent]`,

in user-routing.module!!!:
`@NgModule({ imports: [RouterModule.forChild(routes), RecipesModule], exports: [RouterModule], }) `
