# Solar City Challenge

This application has been deployed to Amazon EC2 instance. Please use this [link](http://ec2-54-163-167-99.compute-1.amazonaws.com:3000/) to go to the site.

# Description

## Problem

[Coding Challenge Guidelines](ChallengeInstructions.md)

* Your application should accept a customer's name, age, address, and why their interested in Solar (Yes/no questions and/or text.).
* Your application should save this information to a database of your choosing.

## Solution

The simplest solution for this problem is providing a HTML form that accepts several informations required. 
Every time user submit the form, we do some validation and then store all data to MySQL database. The tech stacks will be discussed later.

For addition, I implement several new features to gain more insight about the data and to improve user experience of this application. The features are:
* Adding gender options (male/female)
* Adding error dialog if user doesn't fill all the required fields.
* Adding a popup dialog to show the survey result. The result is shown by using two graphs. They are the survey result grouped by gender and by the age. The purpose of this graphs is just to
show the result and how people's interest in solar panel is.

## Architecture

For this challenge, I choose **Back-end track** with Model View Controller (MVC) pattern in both front-end and back-end side.

_Controller_ classes will handle all RESTful API request sent by frontend. All processing related to request validity and
json response will be handled by _Controller_. _Controller_ will have one/more service that interact with _Model_ classes. _Model_ classes are used
to make a call to database. Each data given by database will be processed (if it is needed) in service class. By having this design, each MVC module will have its own responsibilities and will not be bothered if
something change. 

Moreover, all communication between frontend and backend will only be able through RESTful API. Back-end will not render the html page along with the data it requires. However, backend will just render the page and let front-end access the data via provided RESTful API. By using this mechanism, frontend will become more loosely coupled from the back-end.

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

##API Docs

This project RESTful API is documented [here](http://docs.solarcitychallenge.apiary.io/)

## Technology Stacks & Reasoning

### Backend

* _Node.js + Express.js + ES6_. I used node.js because to develop a simple application, node.js is easier to be setup and to
be deployed. Then I use ES6 so that it is easier to follow Object Oriented Paradigm (OOP) and to use dependency injection for this project. 

* _MySQL_. I use MySQL because for this application we only need to use structured data which has been defined before. The problem is if the number of data 
is getting bigger, the performance will be slowed down because query for aggregating the data will take more time to be executed. But, 
for this case I assume that the data are not too huge so MySQL still fits the requirement.

* _Mocha, SinonJS and ExpectJS_ as Node.js testing framwork, mocking framework and assertion library for javascript.

* _PromiseJS_. We can use Promise JS to change the way we use callback in Javascript. If we have cascading request (one after another), it will 
become more convenient to use Promise JS because it can make the code much cleaner.

### Frontend

* _Angular.js_. I'm currently learning angular js framework. So, I think it's a good time for me to give a try
to this challenge. I didn't use React because I think I need to spend time with angular and get used to with it.

* _Bootstrap + Angular.js_ I use these libraries to help me using bootstrap component in angular js frontend.
 
* _Chart.js + Angular.js_ I need this javascript library to visualize the data stored in database, to users.

### What Next?

* If I have more time, I want to use [Sequelize](docs.sequelizejs.com) as the ORM for MySQL. Currently, I'm using native mysql library for node.js.
The caveat is it is using plain SQL query which is not really type-safe. Sequelize provides developer with nice API to connect to database, so it will become more convenient.

* I want to do some integration testing by directly hit the API endpoint and provide some edge cases (such as empty data). 
This testing requires test database and some scripts which will be used to automate the database setup and create some fake data.
So far, I created unit test to test the logic in data processing and to validate data sent by users.

# Commands and Instructions

Preparing node environment
* Install these following npm module:
```
npm install bower -g
npm install forever -g
npm install promise -g
npm install grunt-cli mocha istanbul -g
npm install db-migrate -g
```
* Install node dependencies by using : 
```
npm install
```
* Install bower dependencies by using : 
```
bower install
```

## Environment Variable

Set you environment variable as follows:
```
export DB_NAME=solarcity_challenge
export DB_HOST=localhost
export DB_USER=change with your mysql username
export DB_PASSWORD=change with your mysql password
```
Don't forget to source the environment variable after you add the new variables.

## Database

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

## Running the test

To run the test, use:
 ```
 npm test
 ```

## Running The program

To run this program, use:
```
npm start
```

# Other projects

* [Emergency Social Network](https://github.com/imrenagi/Emergency-Social-Network) This is a team project for Foundation Software Engineering course in Carnegie Mellon University. In this team project,
we won the best testing award for implementing some best practice in unit test and integration test, and the best documentation award because we had good API and architecture documentation. 

* [CHEF](https://github.com/imrenagi/hackucsc2017) Recently, we won hackathon in UC Santa Cruz after we presented Chef, A virtual waiters. In this competition,
we won 1st prize in Technology Innovation, The best use of AWS, and 3rd prize in The Best Use of Google Cloud Platform.

* [Gojek](https://itunes.apple.com/us/app/go-jek/id944875099?mt=8). This is the mobile application that I've ever worked on. I built iOS mobile app and RESTful API for several services. This code is not public so unfortunately I can't share the code with you. 

* [Bridestory Wedding App](https://itunes.apple.com/us/app/bridestory-wedding-app/id1067262519?mt=8). I worked on iOS team for developing this application. This application has been featured in Apple Store Indonesia. The code is not public so unfortunately I can't share the code with you.


# Msc

* I used express project template to generate this project. It created `bin/www` and `app.js`. I just need to add several lines to these files for additional configuration for this app.
* Length of experiences with several framework:
    * NodeJS framework : 1 year
    * Java: 4 years
    * Java Play Framework : 2 years
    * Scala Play Framework : 2 years
