### Node JS AfricasTalking Sample App

Sample app with AT API's - Voice, SMS, USSD, Shortcode demo


### How to run

- Install node.js version ver >5.x.x (this demo runs with ES6 language features)
- Install mysql (create user root, and database wired)


### Create a .env file at the root of the project with the following configs

PORT=

AT_USERNAME=
AT_APIKEY=

DB_HOST=
DB_NAME=wired
DB_USER=
DB_PASS=


### Install Node Modules and start the app

```bash
$ npm install
$ npm start
```


### Routes

- Routes are under routes folder (sms, ussd, voice)
- they are mapped by app.js (look at the route imports)
