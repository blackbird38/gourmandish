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
