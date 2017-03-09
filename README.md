Coding Challenge Guidelines
---------------------------

## Description

### Problem

[Coding Challenge Guidelines](ChallengeInstructions.md)

* Your application should accept a customer's name, age, address, and why their interested in Solar (Yes/no questions and/or text.).
* Your application should save this information to a database of your choosing.

### Solution

The simplest solution for this problem is providing a HTML form that accepts several informations required. 
So, I provided one page website which has form and a button for submitting it.

I implement several additional features for this application. The features are:
* Adding gender options (male/female)
* Adding error dialog if user doesn't fill all the required fields.
* Adding a popup dialog to show the survey result. The results is consisted of two graphs. They are the result based on gender and the age. The purpose of this graph is just to
show the result and how people's interest with solar panel.

### Architecture

>While all submissions are expected to be a full stack application, let us know whether your solution is more focused on back-end, front-end or full stack development (While most of our engineers work full stack in some capacity, for the purpose of the coding challenge no preference is paid towards any specific track.).

For this challenge, I choose **Back-end track** with Model View Controller (MVC) pattern in both front-end and back-end side. 

Backend folder structure:

```
|-- controllers (RESTful API controllers)
|   |-- agecontroller.js
|   |-- survercontroller.js
|-- models (Backend Model. I use Data Access Object pattern)
|   |-- agendao.js
|   |-- surveydao.js   
|-- services (Services layer for interaction between controller and model)
|   |-- database.js
|   |-- surveyservice.js
|   |-- utilservice.js
|-- test
|-- migrations
|   |__ sqls (contains migration scripts)
```

AngularJS frontend folder structure:
```
|-- public
|   |__ javascripts
|       |__ controllers 
|       |__ services (API access)
|       |-- core.js
|   |__ stylesheets
|   |__ templates
|   |-- index.html
```

### Technology Stacks & Reasoning

#### Backend

* _Node.js + Express.js + ES6_. I used node.js because to develop a simple application, node.js is easier to be setup and to
be deployed. Then I use ES6 to make the code become more object oriented language with class absstraction. By using ES6, it's easier for me to use
several techniques such as dependency injection.
* _MySQL_. I use MySQL because for this application we only need to use structured data which has been defined before.
* _Mocha, SinonJS and ExpectJS_ as Node.js testing framwork, mocking framework and assertion library for javascript.

#### Choose of Libraries

#### ADD TRADE-OFF

#### Frontend

* _Angular.js_. I'm currently learning angular js framework. So, I think it's a good time for me to give a try
to this challenge. Other than reason, I didn't use React because I want to understand how those new frontend technology changed
from JQuery to what they have today.
* _Bootstrap + Angular.js_ I use these library to help me use bootstrap component in angular js frontend. 
* _Chart.js + Angular.js_ Because I add feature for showing the survey result, I give a simple visualization using bar chart.  

#### What Next?

>Reasoning behind your technical choices. Trade-offs you might have made, anything you left out, or what you might do differently if you were to spend additional time on the project.

* If I have more time, I want to use [Sequelize](docs.sequelizejs.com) as the ORM for MySQL. Currently, I'm using native mysql library for node.js.
The caveat is it is using plain SQL query which is not really type-safe. Sequelize provides developer with nice API to connect to database, so it will become more convenient.


## Commands and Instructions

Preparing node environment

* Install node dependencies by using : `npm install`
* Install bower dependencies by using : `bower install`

### Environment Variable

Set you environment variable as follows:
```
export DB_NAME=solarcity_challenge
export DB_HOST=localhost
export DB_USER=change with your mysql username
export DB_PASSWORD=change with your mysql password
```
Don't forget to source the environment variable after you add the new variables.

### Database

I use MySQL 5.7 for developing this challenge. The good thing about MySQL is it is easy to setup
and it is suitable for this application. In addition, I also use npm module named `db-migrate` to help me doing database migration if we have any schema changes.

To prepare the database for this application, create database named `solarcity_challenge` by running the following command in mysql console 
```
CREATE DATABASE IF NOT EXISTS solarcity_challenge
```

To create the tables, please run the mysql migration script 
```
db-migrate up
```

### Running the test

To run the test, use:
 ```
 npm test
 ```

### Running The program

To run this program, use:
```
npm start
```

## API Docs

This project is documented in [here](http://docs.solarcitychallenge.apiary.io/)


## Other projects

* [CHEF](https://github.com/imrenagi/hackucsc2017) Recently, we won hackathon in UC Santa Cruz after we presented Chef, A virtual waiters. In this competition,
we won 1st prize in Technology Innovation, The best use of AWS, and 3rd prize in The Best Use of Google Cloud Platform.

* [Gojek](https://itunes.apple.com/us/app/go-jek/id944875099?mt=8). This is the mobile application that I've ever worked on. I built iOS mobile app and RESTful API for several services. This code is not public so unfortunately I can't share the code with you. 

* [Bridestory Wedding App](https://itunes.apple.com/us/app/bridestory-wedding-app/id1067262519?mt=8). I worked on iOS team for developing this application. This application has been featured in Apple Store Indonesia. The code is not public so unfortunately I can't share the code with you.

Review Process
--------------

Your application will be reviewed by the software engineering team. The aspects of your code we will judge include:

* Clarity: Does the README clearly explains the problem and solution?
* Correctness: Does the application do what was asked? If there is anything missing, does the README explain why it is missing?
* Code quality: is the code simple, easy to understand, and maintainable?
* UX: is the web interface understandable and pleasing to use?
* Technical choices: Choices of libraries, databases, architecture etc.
