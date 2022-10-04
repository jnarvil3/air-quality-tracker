# Air Quality Tracker

This is an open-source application meant to help registered users discover the air pollution in their area (or to search for the air pollution in another area) and to determine whether it is more than they can tolerate.

Live demo: https://air-pollution-tracker-jnarvil3.herokuapp.com/

To use your own version of this app, you'll need to create postgresql instance with the following schema:

CREATE TABLE Users (
    UserID INT GENERATED ALWAYS AS IDENTITY,
    Username varchar(50),
    Password varchar(50),
    City varchar(50),
    Threshold varchar(10)
)

The app is currently configured on Webpack to run the frontend on localhost:8080, while the backend server runs on localhost:3000.

Testing:
- Install Cypress
- After getting the dev server up and running, run either:
    - the command line version of Cypress (npx cypress run)
    - or the desktop GUI (npx cypress open) 

Required dependencies are listed in the package.json file (run npm install from within the file directory to have them installed on your machine). Tests are conducted via Cypress. This application runs on React / React Router, Node / Express, and PostgreSQL.

