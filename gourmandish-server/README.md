`npm install`

`npm run dev` + check if it works `http://localhost:3000/ping`

for the tests: `npm run test`

---

mongo shell (cmd: `mongo`):

--- create the Mongo user that will be used for the connection to the MongoDB:---

````> use gourmandishdb
> db.createUser({
    user: "root",
    pwd: "root",
    roles: [
          { role: "readWrite", db: "gourmandishdb" }
    ]
  })```
````

//The 'test_helper' file is important to mocha, it will run it first if it exists.

--- For Docker: ---

steps:

`docker-compose up -d`

then `connect to mongo container` and get into the mongo shell:

`mongo -u root`

pass: `root`

`use gourmandishdb`

````> db.createUser({
    user: "root",
    pwd: "root",
    roles: [
          { role: "readWrite", db: "gourmandishdb" }
    ]
  })```
````

````> use gourmandishdb
> switched to db gourmandishdb
> db.users.insert({

     "roles": [],
     "email": "test@test.com",
     "\_\_v": 0
     })


```> WriteResult({ "nInserted" : 1 })
> show dbs
> admin 0.000GB
> config 0.000GB
> gourmandishdb 0.000GB
> local 0.000GB
> use gourmandishdb
> switched to db gourmandishdb
> show collections
> users
> db.users.find()
> { "```



````

replace in package.json:

win: `"test": "SET NODE_ENV=test && nodemon --exec "mocha -R min"",`

with:

ubuntu: `"test": NODE_ENV=test && nodemon --exec 'mocha -R min',`
