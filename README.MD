# gourmandish

![Alt text](https://1.bp.blogspot.com/-ysm4fdQ_-gA/YB1oEuRjabI/AAAAAAAAAn0/g0417SUi2z464Ync2Ghj09-LQhJQOm4jwCLcBGAsYHQ/s1805/Capture02.PNG)

![Alt text](https://1.bp.blogspot.com/-pd2GhUNuh9Y/YB1oEQRA_oI/AAAAAAAAAnw/jULzaKkRmj8Tct_cKajE-OdgeQl6QJf_gCLcBGAsYHQ/s1804/Capture01.PNG)

![Alt text](https://1.bp.blogspot.com/-wi63ChiOAgY/YB1oEftLk9I/AAAAAAAAAns/O8YUPxbi-6Ih5cz6__I9TwLyj71NqKE3gCLcBGAsYHQ/s1005/Capture03.PNG)

![Alt text](https://1.bp.blogspot.com/-X9hAHKm35SM/YB1oFcQBd7I/AAAAAAAAAn4/8Wvv8tMwarw55zkNvBBJK4m6ErMPx-FNgCLcBGAsYHQ/s1799/Capture04.PNG)

Search:
![Alt text](https://1.bp.blogspot.com/-aws8YOauBZM/YB1oGGs8itI/AAAAAAAAAn8/YSZRUOPEyWcgqsPZu4BRE0_NaS5Y7wCnwCLcBGAsYHQ/s1815/Capture05.PNG)

![Alt text](https://1.bp.blogspot.com/-Uys0QhBcqP8/YB1oGAYAw2I/AAAAAAAAAoA/WfhiWLRKlD09-cMT64p83jOXXTfZB0ZkwCLcBGAsYHQ/s1816/Capture06.PNG)

![Alt text](https://1.bp.blogspot.com/-Wa9epKi4nNA/YB1oGVmYjFI/AAAAAAAAAoE/n5s1NMK3ar0IMQHLIH8UZ-unLBr0T-DFgCLcBGAsYHQ/s1794/Capture07.PNG)

![Alt text](https://1.bp.blogspot.com/-V2FBS-sIlm8/YB1oGtOqxZI/AAAAAAAAAoI/L5CAzJiTFXg4IMj4pgr2dpSxrnC4HnWfwCLcBGAsYHQ/s1805/Capture08.PNG)

![Alt text](https://1.bp.blogspot.com/-I9GBzFPnZbw/YB1oG4iwyoI/AAAAAAAAAoM/3lxNUDEnFK4gYr4ioLBlGK3Ay9gNpLc2QCLcBGAsYHQ/s1803/Capture09.PNG)

![Alt text](https://1.bp.blogspot.com/-pbvnA3Uxeog/YB1oN-1BsYI/AAAAAAAAAoQ/lL4IAhI_V3kEqd0ohbPUEW0uIU_KCDNCwCLcBGAsYHQ/s1813/Capture10.PNG)

![Alt text](https://1.bp.blogspot.com/-wi63ChiOAgY/YB1oEftLk9I/AAAAAAAAAns/O8YUPxbi-6Ih5cz6__I9TwLyj71NqKE3gCLcBGAsYHQ/s1005/Capture03.PNG)

![Alt text](https://1.bp.blogspot.com/-LI8r0j0GDgc/YB12fVU9gWI/AAAAAAAAAo8/-XUH4NHwTnMcRsVIDTayVhqM8GeTdcPwwCLcBGAsYHQ/s990/Capture11.PNG)

![Alt text](https://1.bp.blogspot.com/-Nis_r5UFsfU/YB12fIh83vI/AAAAAAAAAo4/UiwXd27Q2rM7ZO6IsCezymaqre2_ilo2gCLcBGAsYHQ/s1035/Capture12.PNG)

![Alt text](https://1.bp.blogspot.com/-0eVq8VP3or0/YB12fDCiveI/AAAAAAAAAo0/327b1N2keRYj10TeVDHT6Qr0gVqq7LmGwCLcBGAsYHQ/s1040/Capture13.PNG)

![Alt text](https://1.bp.blogspot.com/-tnpTK6OJPcQ/YB12gT-9GaI/AAAAAAAAApA/3dnlA4b7VaUseI5HLtfsaHZeXc5kZD-YQCLcBGAsYHQ/s1037/Capture14.PNG)

![Alt text](https://1.bp.blogspot.com/-EzRu1lMjjJE/YB12goF62KI/AAAAAAAAApE/b12Wyl6C1IYP6DI3h_PqCe49aPiiBaoPwCLcBGAsYHQ/s1033/Capture15.PNG)

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
