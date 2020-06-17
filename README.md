[![Build Status](https://travis-ci.com/funmi5/backend-test.svg?branch=master)](https://travis-ci.com/funmi5/backend-test)
[![Maintainability](https://api.codeclimate.com/v1/badges/b07c4260e89eb1a1c11e/maintainability)](https://codeclimate.com/github/funmi5/backend-test/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b07c4260e89eb1a1c11e/test_coverage)](https://codeclimate.com/github/funmi5/backend-test/test_coverage)

# Mkobo Backend Test

## :rocket: Quick start

1.  Have Git and Node.js installed on your computer.
2.  Clone the repo using this link: _https://github.com/funmi5/backend-test.git_
3.  cd into the project and run _npm install_ to install the modules.
4.  Create a .env file and add the necessary variables following the _.env.sample_ format.
5.  In your local postgres, create two databases called: `mkobodev_db` and `mkobotest_db`
6.  Run _npm run pre-dev_ and _npm run pre-test_ to migrate and seed in data for both dbs.
7.  Run _npm run start:dev_ to start the development server.
8.  Run _npm run test_ to run the test files.
 
## :star: Technologies Used

1. Node.js and Express.js
2. Sequelize ORM
3. PostgreSQL
4. Git

## :sunny: Sample .env file format

```

SECRET = 
DATABASE_URL=postgres://<db_user>:<db_pass>@127.0.0.1:5432/mkobodev_db
TEST_DATABASE_URL=postgres://<db_user>:<db_pass>@127.0.0.1:5432/mkobotest_db 

```

## :cherry_blossom: Sample test format

<h4>1. To sign up:</h4>

  POST `http://localhost:3000/api/v1/users/signup`

   ```
   {
	"fullname": "Ayinke Williams",
	"email": "ayinwill@gmail.com",
	"password": "ayin.will",
}
   ```

<h4>2. To sign in:</h4>
   
  POST `http://localhost:3000/api/v1/users/signin`

   ```
   {
	"email": "ayinwill@gmail.com",
	"password": "ayin.will",
}
   ```
<h4>3. To create account after sign up:</h4>
  
  - let us assume a unique wallet number has been generated for you
   
  POST `http://localhost:3000/api/v1/account/create`

   ```
   {
	"walletNumber": "93093",
	"walletBalance": "200000"
}
   ```

<h4> 4. To send money to another wallet</h4>
   
   - Authentication required after sign up/in: _Bearer token_
   - add the _token_ gotten from sign up/in to the Bearer field of postman/insomnia
   - the _id_ at the route params represents the _accountId_ of an account/user
   
  POST `http://localhost:3000/api/v1/account/send/6c8f5528-c442-477e-97f0-75c8e0c62f33`
   
   ```
   {
	"walletBalance": "800",
	"category": "transfer money",
	"amount": "100",
	"walletNumber": "9098765",
	"message": "for tolu's party" 
}
   ```   
   
<h4>5. To buy airtime</h4>
   
   - Authentication required after sign up/in: _Bearer token_
   - add the _token_ gotten from sign up/in to the Bearer field of postman/insomnia
   - the _id_ at the route params represents the _accountId_ of an account/user
   
  POST `http://localhost:3000/api/v1/bill/airtime/6c8f5528-c442-477e-97f0-75c8e0c62f33`
   
   ```
   {
	"walletBalance": "1000", // copy and paste the wallet balance after any transaction
	"category": "pay airtime",
	"messsage": "optional",
	"amount": "100",
	"airtime": "Mtn" ,
}
   ```

<h4>6. To pay for electricity</h4>
   
   - Authentication required after sign up/in: _Bearer token_
   - add the _token_ gotten from sign up/in to the Bearer field of postman/insomnia
   - the _id_ at the route params represents the _accountId_ of an account/user
   
  POST `http://localhost:3000/api/v1/bill/electricity/6c8f5528-c442-477e-97f0-75c8e0c62f33`
   
   ```
   {
	"walletBalance": "100",
	"category": "pay for electricity",
	"amount": "100",
    "electricity": "Abuja Electricity",
	"meterNo": "7878787878"
}
   ```   

<h4>7. To view personal account </h4>
   
   - Authentication required after sign up/in: _Bearer token_
   - add the _token_ gotten from sign up/in to the Bearer field of postman/insomnia
   
  GET `http://localhost:3000/api/v1/account/view`  
  

## Api documentation: 
https://documenter.getpostman.com/view/5981739/SzzkawLN

## Developed by:
Funmilayo E. Olaiya   