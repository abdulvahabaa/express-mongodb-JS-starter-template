# express-mongodb-JS-starter-template

> This repository is used to create an Express MongoDB backend starter template for my projects.

## Table of Contents

- [express-mongodb-JS-starter-template](#express-mongodb-js-starter-template)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation and Setup](#installation-and-setup)
    - [Prerequisites](#prerequisites)
    - [Environment Setup](#environment-setup)
    - [Running the Application](#running-the-application)
  - [Usage](#usage)
    - [API Endpoints](#api-endpoints)
      - [User Authentication and Profile Management](#user-authentication-and-profile-management)
    - [Database Schama](#database-schama)
      - [uers collection](#uers-collection)

## Features

- **User Authentication**: Secure registration and login for users.
- **Security**: Implemented with secure authentication and authorization to protect user data. cors protection use helmet and cors options and JWT

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Testing**: playwright for unit and integration tests.

## Installation and Setup

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- Mongodb installed and running

### Environment Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/abdulvahabaa/express-mongodb-JS-starter-template.git
   cd express-mongodb-JS-starter-template
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create an `.env` file in the root directory and add the following:

   ```env
   PORT=9002
   PG_USER=postgres
   PG_HOST=localhost
   PG_DATABASE=<Your DataBase Name>
   PG_PASSWORD=<Your Password>
   PG_PORT=5432
   JWT_SECRET=a7f8c4f56a8d4c3b9f7e2a9b7e0d2f3c5b4a6f7c8d1e2b3c4a5b6d7c8f9e0a1b

   ```

### Running the Application

1. Start the backend server:

   ```bash
   npm run devStart
   ```

2. The API should now be running on `http://localhost:9002`.

## Usage

### API Endpoints

Refer to the following sections for detailed information on each API endpoint.

#### User Authentication and Profile Management

- **Register a new user**: `POST /auth/signup`
- **Login a user**: `POST /auth/login`
- **LogOut a user**: `POST /auth/logout`
- **Get user profile**: `GET /user/:id`

### Database Schama

#### uers collection

```markdown
| Field      | Type    | Description            |
|------------|---------|------------------------|
| `_id`      | ObjectId| Unique identifier      |
| `userId`   | String  | User identifier        |
| `name`     | String  | User's name            |
| `email`    | String  | User's email           |
| `password` | String  | User's password        |
| `isActive` | Boolean | Account active status  |
| `createdAt`| Double  | Timestamp of creation  |
```
