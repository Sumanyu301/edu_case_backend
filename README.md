# EduCase Backend

This is the backend for the EduCase application, built with Node.js, Express, and Prisma.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- PostgreSQL (or any other supported database by Prisma)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/EduCase.git
   cd EduCase/backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up your database:

   - Create a `.env` file in the root directory and add your database connection string:
     ```env
     DATABASE_URL="your-database-connection-string"
     ```

4. Run Prisma migrations to set up your database schema:
   ```sh
   npx prisma migrate dev --name init
   ```

## Running the Application

1. Start the server:

   ```sh
   npm start
   ```

2. The server will be running on `http://localhost:5000`.

## API Endpoints

### Add School

- **Endpoint:** `/addSchool`
- **Method:** `POST`
- **Payload:**
  ```json
  {
    "name": "School Name",
    "address": "School Address",
    "latitude": 12.345678,
    "longitude": 98.765432
  }
  ```
