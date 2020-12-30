# gourmandish

https://gourmandish.vercel.app/

## Requirements:

#### ANGULAR CLI: 11.0.2 - https://cli.angular.io

`ng version`

#### NODE: v14.15.1 - https://nodejs.org/en/download/

`node -v`

#### Install MongoDB: https://docs.mongodb.com/manual/installation/

Install Compass: https://www.mongodb.com/products/compass and create the database `gourmandishdb`

MongoDB shell version: v4.4.2

`mongo --version`

mongo shell (cmd: `mongo`):

#### --- create the Mongo user that will be used for the connection to the MongoDB:---

```
> use gourmandishdb
```

```
> db.createUser({
   user: "root",
   pwd: "root",
   roles: [
         { role: "readWrite", db: "gourmandishdb" }
   ]

})
```

## installation:

#### client: `npm install`

#### server: `npm install`

## start the servers:

#### client (dev): `ng serve` + Navigate to `http://localhost:4200/`

`ng build --prod`

`ng test`

#### server (dev): `npm run dev` + check if it works `http://localhost:3000/ping`

server: `npm run test`

The purpose of this application is to let gather the people that share the passion for cooking. Registered users can show to others their favorite recipes, they can add in a cookbook the recipes that they love most to serve as later inspiration; they can create shopping lists by adding several recipes together (this will give them a total of quantities and the cost eventualy); they can create menus (feature) AND they can create 'dineups' to invite friends for dinner!
They can also sell their products (feature) to nearby users that don't have time or don't know to cook but miss the taste of homemade food!
Users can follow other users and see in their feed the latest activities of those (new recipes, new dineups, new proposed meals for selling) of them. Users can share their impressions on the recipes through the comments and likes (eventually share their photos - feature). They can give reviews to bought food (feature). They can contact other people through direct messages (chat) (feature).

Anonymous user can look for inspiration for their next dinner.

Every User is defined by an username, an email, a firstname and a family name, registeredAt, avatar, location

Every Recipe is defined by a title, the categories[] it belongs to, description, prep-time (d:h:m), cook-time (d:h:m), imageUrl, ingredients[] (possibility for adding the ingredients into groups that design different parts of the final product: eg. for the filling, for the topping, to serve, etc), steps[] (with pictures/videos and description), dificulty (easy, hard, challenging), affordability? (affordable, pricey, luxurious), isFlutenFree, isVegan, isVegetarian, isLactoseFree, createdAt, createdBy

(feature:) canBeSold, price (TO UPDATE later)

Every Category is defined by a title, color.

Every Ingredient is defined by a quantity?, a measure unit?, a name. (eg: 2 onions, 30g sugar, 1 tablespoon olive oil), a group? (eg. for the filling, for the topping, to serve, etc)

Every Step is defined by a title?, a description, pictures[]?, videos[]?, group? ( = can group the steps for specific part of the product ? = TO SEE).

Every Cookbook (TO UPDATE later)

Every ShoppingList (~ a shopping cart) TO UPDATE later)

------ features ----

Every Menu (TO UPDATE later)

Every DineUp (TO UPDATE later)

Translation: en, fr, ro
