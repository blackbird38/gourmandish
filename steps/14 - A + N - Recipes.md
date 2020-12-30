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

display err for async validator:

https://medium.com/@tomaszsochacki/how-to-do-asynchronous-validator-in-angular-7-6e80243a874a

---

display all recipes and display by userId:

`ng g c recipes/recipeList`

`ng g c recipes/recipeItem`

display recipe details
`ng g c recipes/recipeDetails`

edit recipe

the component recipe-form can be used either for creating a recipe or for updating an existing one:
creating a resolver to read if there is an id in the route. if there is an id, proceed to fetch the data  
from the backend and update it

`ng g s recipes/services/recipeFormResolver`

`ng g p pipes/TimeAgo`
