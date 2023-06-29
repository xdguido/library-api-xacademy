## About This Project

This project is a RESTful API designed for creating and managing libraries and book registries. Built using the Express.js framework, it follows the Model-View-Controller (MVC) architecture. Views component are not present. Instead, the API returns data in JSON format.

## Key Features

### Routing

This repository leverages the powerful routing capabilities of Express.js to handle incoming requests by matching the request URL and HTTP method with the defined routes. Express.js then triggers the corresponding handlers to process the requests and generate appropriate responses.

### Request handling

In this repository, request handling follows a structured approach where request handlers are organized into files based on their assigned functionalities. Controllers act as intermediaries between the Model layer and the client, facilitating the manipulation of data through the models and returning appropriate responses.

The architecture of request handling in this repository includes the following components:

**Controllers:** Controllers play a crucial role in handling incoming requests and orchestrating the appropriate actions. They serve as a bridge between the client and the Model layer, facilitating data manipulation operations. Controllers leverage services to perform specific functionalities and business operations, ensuring a modular and reusable approach.

**Services:** Services encapsulate specific functionalities or business operations. They provide a modular and reusable approach by containing the logic required to perform specific tasks. Controllers rely on services to carry out the necessary operations, allowing for separation of concerns and promoting code maintainability.

**Providers:** Providers are responsible for handling operations that interact with the database. They encapsulate database-related functionality and expose functions that allow controllers or services to interact with the data layer efficiently. By encapsulating database interactions within providers, the codebase becomes more organized, scalable, and maintainable.

### Data Persistence

This repository incorporates SQLite and the Sequelize ORM to provide persistent storage for the application data. By leveraging these technologies, the repository enables seamless interaction with the underlying data store, abstracting away the database operations through the model layer.

**SQLite Database:** SQLite is a lightweight and self-contained database engine that offers excellent performance and reliability.

**Sequelize ORM:** Sequelize simplifies database operations by providing a high-level interface that abstracts away the complexities of raw SQL queries. It allows to define models, relationships, and perform common database operations using JavaScript functions and syntax.

### Input Validation and Sanitization

Zod and Xss libraries are implemented, providing schema validation and sanitization capabilities through middleware.

**Zod Library:** Zod enables validation of input data, ensuring it conforms to the defined schema before further processing.

**Xss Library:** Xss library is used for sanitizing user input to prevent cross-site scripting (XSS) attacks.

### Authentication and Authorization

Uses Passport and JWT to create an authorization middleware to protect routes. Users are required to authenticate throw a login enpoint, and access to specifics routes needs authorization headers (Bearer token).

### Error Handling

A middleware is provided for handle exceptions. An extention of javascript error is provided for consistent exception behavior.

### Automated End-to-End testing

This repository includes a comprehensive suite of automated tests written with Jest, which enables end-to-end testing across all layers of the application. These tests ensure the seamless integration and proper functioning of the various components within the system.

## Getting Started

Install dependencies with `npm install`.

**To run in development:**

-   `npm run dev`

**To run tests:**

-   `npm run test`

**To run in production:**

-   `npm run build`
-   `npm run start`
