npm install --save bulma

add in angular.json: "node_modules/bulma/css/bulma.min.css",

migrating from css scss: https://www.npmjs.com/package/schematics-scss-migrate

ng g schematics-scss-migrate:scss-migrate

---

https://fontawesome.com

https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers

npm i @fortawesome/fontawesome-free

angular.json

"styles": [
"./node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss",
"./node_modules/@fortawesome/fontawesome-free/scss/regular.scss",
"./node_modules/@fortawesome/fontawesome-free/scss/solid.scss",
],
