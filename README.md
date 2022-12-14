# Scala Hiking Interview

This project is a user interface and api designed to solve the hiking take home problem for scala computing

## Running the application

Run `docker compose up` to build and run the nginx, backend and frontend docker containers

Once the containers are running, visit `http://localhost:3000` to view the application

## Frontend design

![UI](images/scala_interview.png?raw=true)

The frontend is divided into five main sections described below

### app folder

The app folder contains

- store definition containing the main reducer
- type definition used within the application
- boilerplate hooks generated by create-react-app

### components folder

The components folder contains individual files for the cards and forms that make up the UI

### functions folder

The functions folder primarily contains the function to calculate info about a bridge crossing. It also has a series of tests for the traversal function

### services folder

The services folder contains the redux toolkit api that is used to generate hooks for interacting with the api

### App.tsx

The App.tsx file contains all the code used to compose the frontend. It triggers the requests, creates form hooks and checks for for errors.

## Backend design

The backend only contains two files. One file creates the FastAPI instance, defines default data and creates endpoints. The other file defines the types used by the API.
