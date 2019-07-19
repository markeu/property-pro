
[![Build Status](https://travis-ci.com/markeu/property-pro.svg?branch=develop)](https://travis-ci.com/markeu/property-pro)

[![Coverage Status](https://coveralls.io/repos/github/markeu/property-pro/badge.svg?branch=ft-view-property-type-167097139)](https://coveralls.io/github/markeu/property-pro?branch=ft-view-property-type-167097139)


# PropertyPro-lite

Property pro Lite is a platform where users can upload and advertise their property for sale. Users can lookup property advertised for sale or place their own property for sale.

## Project management information on pivatal tracker

* See the project stories [here](https://www.pivotaltracker.com/n/projects/2354316)

## UI Design


## User Interface (UI) Tech Stack (Frontend)

* HTML
* CSS
* Javascript



### REST API Docs

[PropertyPro-lite documentation link](https://propertyproliteapp.herokuapp.com)

### Required Features

```
User can sign up.
User can sign in.
User (agent) can post a property advert
User (agent) can update detail of a property advert.
User (agent) can mark his/her posted advert as sold.
User (agent) can delete a property advert.
User can view all properties adverts.
User can view all properties of a specific type - 2 bedroom, 3 bedroom, mini flat etc.
User can view a specific property advert.
User can flag a property as fraud
```


## Installation and Running the Application

Ensure that you have nodejs and npm installed in your computer

a. Clone this repository into your named folder

```bash
git clone -b develop https://github.com/markeu/property-pro
git status
```

b. Install the project dependencies

```bash
npm install
```

c. start the application

```bash
npm start
```


## Test the endpoints

The application can be tested locally through localhost on port 5000 or through the live [url](https://propertyproliteapp.herokuapp.com) using postman

1. Run the application while postman is open
2. Go to postman and test against the endpoints below with the required property:-

### Endpoints to test

Method        | Endpoint      | Enable a user to: |
------------- | ------------- | ---------------
POST  | api/v1/auth/signup  | Create user account  |
POST  | api/v1/auth/signin  | Login a user |
POST  | api/v1/property  | Create a property advert |
POST  | api/v1/property/<:property-id>  | Flag property as fraud |
PATCH  | api/v1/property/<:property-id>  | Update property data |
PATCH  | api/v1/property/<:property-id>/sold  | Mark a property as sold so users know it’s no longer available |
DELETE  | api/v1/property/<:property-id>  | Delete a property advert |
GET  | api/v1/property/ | Get all property adverts |
GET  | api/v1/property/search?type =​ propertyType  | Get all property advertisement offering a specific type of property (e,g flat, mini-flat,etc) |
GET  | api/v1/property-advert/<:property-id>  | View a specific property advert |



## Author

* Uche Uzochukwu Mark

