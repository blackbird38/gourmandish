`ng g m Recipes --routing`

add a recipe:

`ng g c recipes/recipe-form`

`ng g c shared/image-upload-with-preview`

https://www.zeptobook.com/best-chrome-extensions-for-debugging-angular-apps/

https://augury.rangle.io/ ( but it's not working for Ivy :( ) :

https://github.com/rangle/augury#supported-version

https://medium.com/swlh/let-angular-ivy-work-with-augury-simply-workaround-2c86ded1b3a5

https://www.zeptobook.com/best-chrome-extensions-for-debugging-angular-apps/

https://blog.bitsrc.io/my-top-favorite-tools-for-angular-developers-c2ed96397f6b

`ng g s recipes/services/recipe` + recipe webservice

backend:
`npm install --save multer` - for file upload

added a jwtCheckAuth middleware to protect the route POST /api/recipes and to get the id of the user that created the recipe from the token

---

display all recipes:

ng g c recipes/recipeList
