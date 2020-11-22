`npm install --save mocha`

`npm run test`

package.json:

"test": "nodemon --exec mocha -R min"

"test": "nodemon --exec mocha --recursive"

"test": "NODE_ENV=test nodemon --exec 'mocha --recursive -R min'"

to make fake http req to out app:

`npm install --save supertest`
