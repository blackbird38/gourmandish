
By default, Express doesn't do a good job of handling the body of the request (it receives it in pieces). Solution: using a tiny library called BodyParser (middleware) to take the incoming pieces of request and convert them into something that we can make use of

https://www.npmjs.com/package/body-parser

`npm install --save body-parser`