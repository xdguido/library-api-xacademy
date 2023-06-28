## About This Project

This project is a REST API built using the Express.js framework and follows the Model-View-Controller (MVC) architecture. Views component are not present. Instead, the API returns data in JSON format.

## Key Features

-   **Routing:** Express.js matches the requested URL with the defined routes and triggers the corresponding handlers.

-   **Request handling:** Request handlers are structured in files with assigned functionalities. Controllers are intermediaries between our Model layer and the client. They manipulate data through the models, and return appropriate responses. Controllers relies on Services, functions that encapsulates specific functionality or business operations, providing a modular and reusable approach. Operations that interacts with the database are written inside Provider functions.

-   **Data Persistence:** Integrates with SQLite and Sequelize ORM to provide persistent storage for the application data. The model layer abstracts away the database operations, enabling seamless interaction with the underlying data store.

-   **Input Validation and Sanitization:** Implements Zod and Xss libraries to create schema validation and sanitization middleware to ensure the integrity and security of incoming data.

-   **Authentication and Authorization:** Uses Passport and JWT to create an authorization middleware to protect routes. Users are required to authenticate throw a login enpoint, and access to specifics routes needs authorization headers (Bearer token).

-   **Error Handling:** A middleware is provided for handle exceptions. An extention of javascript error is provided for consistent exception behavior.

## Usage and testing

Install dependencies with `npm install`.

#### To run the application in development:

-   `npm run dev`

#### To run tests:

This repo provides end-to-end tests for quick demostration of the application.

-   `npm run test`

#### To run in production:

-   `npm run build`
-   `npm run start`
