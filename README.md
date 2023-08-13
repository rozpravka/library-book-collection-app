# library-book-collection-app

## Introduction
---
This repository concerns a library app built using Node.js and Postgresql. The app loads approximately 11000 books from csv file. User then can add a book to the total collection, but can also manage his own book "wishlist". This application incorporates libraries such as passport, passport-google-oauth2 in order to authenticate users using Google's OAuth 2.0 authentication. Moreover, csv-parser for loading the initial collection of the books, ejs that is responsible for generating dynamic HTML content on the server-side, express-session for managing user sessions, prisma+@prisma/client for managing the postgres database and honeycombio/opentelemetry-node" + @opentelemetry/auto-instrumentations-node for tracing purposes.

## User instructions
---
1. Clone this project
2. Set up .env file
3. Install dependencies
4. Generate Prisma Client
5. Start the project

### Setting up .env file
---
To configure your application with necessary environment variables, you need to create a `.env` file in the project directory. This file will store sensitive information and configuration settings securely. Below are the environment variables required for the application to run properly:

1. `DATABASE_URL`: The URL to your database.

2. `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: These are credentials provided by Google for OAuth authentication. You'll need to create a project in the Google Developer Console to obtain these credentials.

3. `SESSION_SECRET`: A secret key used for encrypting session data. Make sure to choose a strong and secure value to enhance your application's security.

4. `HONEYCOMB_API_KEY`: API key required to send traces and telemetry data to Honeycomb's platform.

5. `OTEL_SERVICE_NAME`: This environment variable specifies the service name that will be associated with the traces.

### Install dependencies
```npm install```

### Generate Prisma Client
```npm run prisma-generate```

### Start the project
```npm start```

#### Start the project for tracing purposes
```npm run tracing```
