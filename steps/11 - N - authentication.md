`npm install --save mongoose-unique-validator`

`npm install --save bcrypt`

jwt.io:

`npm install --save jsonwebtoken`

---

`npm install bulma`

---

ng g m Auth --routing

ng g m Shared

ng g c auth/Signin

ng g c auth/Signup

ng g c shared/Input

in imports: ReactiveFormsModule in auth.module.ts

---

npm install semantic-ui-css

add in styles.css:

@import "semantic-ui-css/semantic.css"

---

ng g class auth/validators/MatchPassword

ng g class auth/validators/UniqueUsername

---- fixed cors issue (NS_ERROR_DOM_BAD_URI) ----

app.js

app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', '\*');
res.setHeader(
'Access-Control-Allow-Headers',
'Origin, X-Requested-Width, Content-Type, Accept, Authorization'
);
res.setHeader(
'Access-Control-Allow-Methods',
'GET, POST, PATCH, DELETE, PUT, OPTIONS'
);
next();
});

---

ng g service auth/Auth

---debugging - the errors object:---------

{{ authForm.get("username").errors | json }}

null = when everything is alright

{ "usernameNotAvailable": true } = when empty

{ "pattern": { "requiredPattern": "/^[a-z0-9]+$/", "actualValue": "sss!" } } = when invalid format

{ "maxlength": { "requiredLength": 20, "actualLength": 33 } } = when too long

{ "minlength": { "requiredLength": 3, "actualLength": 2 } } = when too short

{ "usernameNotAvailable": true } = when username not available
