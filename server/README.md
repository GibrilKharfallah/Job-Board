Backend for Job Management System

This is the backend of a job management system built using Node.js, Express, Sequelize ORM, and MySQL. It handles user authentication, job postings, applications, and various management features for both companies and job seekers.
Table of Contents

    Technologies Used
    Installation
    Environment Variables
    Database Models
        Company Model
        People Model
        Advertisement Model
        Application Model
    API Endpoints
        Companies
        People
        Advertisements
        Applications
    Error Handling
    Running Tests

Technologies Used

    Node.js: Server runtime
    Express.js: Web framework
    MySQL: Relational database
    Sequelize: ORM for database interactions
    jsonwebtoken: JWT for authentication
    bcryptjs: Password hashing
    dotenv: Environment variable management
    CORS: Cross-Origin Resource Sharing middleware

Installation

    Clone the repository:

    bash

git clone git@github.com:EpitechMscProPromo2027/T-WEB-501-PAR_49.git
cd your-repo/server

Install the dependencies:

bash

npm install

Setup MySQL Database:

    Create a MySQL database.
    Update the .env file with the database credentials.

A SQL script is given onto the server/config:
    
    sudo mysql -u root -p
    USE "mydb" -- your database name
    source mydb.sql -- witch is our script for the db instanciation

Start the server:

bash

    npm start
    npm start dev --- for nodemon use
Environment Variables

Make sure to set up the following environment variables in a .env file:


    PORT=5000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=password
    DB_NAME=job_management_db
    JWT_SECRET=your_jwt_secret

If everything went well you'll get :

> server@1.0.0 start
> node server.js dev

    Le serveur fonctionne sur le port 5000
    Connexion à la base de données MySQL réussie
    Les modèles ont été synchronisés avec la base de données


Database Models

The application uses Sequelize ORM to manage MySQL tables. Below are the main models.
Company Model

    Table Name: companies
    Fields:
        id: Auto-incrementing primary key
        name: Company name
        email: Contact email
        city: Company location city
        region: Company location region
        password: Hashed password for login
        isAdmin: Boolean flag to identify admin accounts

People Model

    Table Name: people
    Fields:
        id: Auto-incrementing primary key
        name: User name
        email: Contact email
        city: User location city
        region: User location region
        password: Hashed password for login
        isAdmin: Boolean flag to identify admin accounts

Advertisement Model

    Table Name: advertisements
    Fields:
        id: Auto-incrementing primary key
        title: Job title
        description: Job description
        contractType: Type of contract (e.g., full-time, part-time)
        sector: Job sector (e.g., IT, Healthcare)
        city: Job location city
        region: Job location region
        wage: Salary offered
        startingDate: Job starting date
        expiringDate: Application closing date
        companyId: Foreign key linking to companies

Application Model

    Table Name: applications
    Fields:
        id: Auto-incrementing primary key
        applicantId: Foreign key linking to people
        jobId: Foreign key linking to advertisements
        applicationDate: Date the application was submitted

API Endpoints
Authentication
POST /company/login

    Authenticates a company and returns a JWT token.
    Request Body:

    json

{
"email": "company@example.com",
"password": "password123"
}

Response:

json

    {
      "token": "your_jwt_token"
    }

POST /people/login

    Authenticates a user and returns a JWT token.
    Request Body:

    json

{
"email": "person@example.com",
"password": "password123"
}

Response:

json

    {
      "token": "your_jwt_token"
    }

Companies
GET /company/get-company/:id

    Retrieves the details of a company by its ID.
    Headers: Requires JWT token in the Authorization header.
    Response:

    json

    {
      "id": 1,
      "name": "Tech Company",
      "email": "info@techcompany.com",
      "city": "Paris",
      "region": "Ile-de-France"
    }

PUT /company/update-company/:id

    Updates company information.
    Headers: Requires JWT token in the Authorization header.
    Request Body:

    json

    {
      "name": "Updated Company",
      "email": "newemail@company.com",
      "city": "New City",
      "region": "New Region"
    }

People
GET /people/get-people/:id

    Retrieves a user by their ID.
    Headers: Requires JWT token in the Authorization header.

Advertisements
GET /ad/get-ads/:companyId

    Retrieves all job advertisements for a specific company.
    Headers: Requires JWT token in the Authorization header.
    Response:

    json

    [
      {
        "id": 1,
        "title": "Software Engineer",
        "contractType": "Full-time",
        "wage": 50000,
        "city": "Paris",
        "startingDate": "2024-10-01"
      },
      ...
    ]

POST /ad/add-ad

    Adds a new job advertisement for a company.
    Headers: Requires JWT token in the Authorization header.
    Request Body:

    json

    {
      "title": "New Job Title",
      "description": "Job description",
      "contractType": "Full-time",
      "sector": "IT",
      "city": "Paris",
      "region": "Ile-de-France",
      "companyId": 1,
      "wage": 60000,
      "startingDate": "2024-10-01",
      "expiringDate": "2024-12-31"
    }

Applications
POST /application/add-app

    Submits a new application for a job posting.
    Headers: Requires JWT token in the Authorization header.
    Request Params:
        the id from database
    Request Body:
    
    json

    {
      "jobId": 1,
      "applicantId": 1,
      "applicationDate": "2024-10-01"
    }

Error Handling

All API responses follow a consistent error format

And error codes norms have been respected:

    404 Not Found: For resources that do not exist.

    json

{
"error": "Resource not found"
}

500 Internal Server Error: For unexpected server errors.

json

    {
      "error": "An unexpected error occurred"
    }

Running Tests

To run the backend tests (  ! not implemented finally !  ), use:

bash

npm test
