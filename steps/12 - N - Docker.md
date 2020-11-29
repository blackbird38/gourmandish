created the `Dockerfile`

created `docker-compose.yml`

`docker build -t gourmandish .`

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
