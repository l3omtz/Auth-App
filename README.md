# DocNow
Fastest way to get help online

Login or create a user off the bat. Authenticates user and navigates to dashboard and stores Token in database. Once loged out it clears the token. Only users with the right token have  access to ertain pages.

When adding a user it hashes password and saves it to mongo database hosted on mLab.
Build with bootstrap so it gives it a very professinal look.

## Built With
* [MongoDB](https://www.mongodb.com/)
* [Express](https://expressjs.com/)
* [Angular](https://angular.io/)
* [NodeJS](https://nodejs.org/en/)

* [mLab](https://mlab.com/)
* [PassportJs](http://passportjs.org/) with JWT token
* [BycrptJs](https://github.com/dcodeIO/bcrypt.js) for hash passwords

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build and Development Server
Both hosted on `http://localhost:3000/`

Run `npm run build` and navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

Navigate to `http://localhost:3000/api for api

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
