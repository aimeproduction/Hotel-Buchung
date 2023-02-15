# HotelBuchungAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.0.<br><br>
This web application allows you to manage hotel room reservations in an establishment.
The application consists of 3 pages:
<ul>
<li>
<strong>The page new booking:</strong> On this page it is possible to make a new booking for a client.
For this purpose, information about the customer such as name, surname, departure and arrival
dates are required. A reservation cannot be made for a date earlier than the date of the reservation.
A reservation can only be made for a minimum of one night.</li>
<li>
<strong> The page list of booking:</strong> On this page it is possible to make changes to reservations that have already
been made. The personal information of the client can for example be changed in case it has been filled
in incorrectly. It is also possible to change the room number that has been booked by the client,
provided that the new room chosen by the client is free during the period of his stay. On the same
page it is also possible to cancel a reservation.</li>
<li>
<strong> The page Entertainment:</strong> On this page it is possible to use an artificial intelligence
developed by beta openai. It is similar to the very famous Chatgpt
</li>
</ul>

##  Server configuration
This application does not work with a server that has been fully implemented but rather with `JSON-Server`.
JSON Server is a Node Module that can be used to create demo rest json webservice.
<br>To install JSON-Server run => `npm i json-server`.
<br> To launch JSON-Server run => `json-server --watch db.json`.


## Development server


Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
