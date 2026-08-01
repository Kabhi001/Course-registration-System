# Course Registration System

A full-stack course registration application with a React frontend and a Spring Boot backend.

## Features
- Manage courses and students
- Register students for courses
- View dashboard statistics and analytics
- REST APIs with MySQL persistence

## Project Structure
- crs-backend/ - Spring Boot REST API
- crs-frontend/ - React dashboard UI

## Tech Stack
- Backend: Java 17, Spring Boot 3, Spring Data JPA, MySQL
- Frontend: React 19, React Router, Create React App

## Getting Started

### Prerequisites
- Java 17+
- Maven
- Node.js and npm
- MySQL running locally

### Backend Setup
`ash
cd crs-backend
./mvnw spring-boot:run
`

Set up MySQL and update database credentials in crs-backend/src/main/resources/application.properties.

### Frontend Setup
`ash
cd crs-frontend
npm install
npm start
`

The frontend expects the backend API at http://localhost:8080.

## Run Locally
1. Start MySQL.
2. Start the backend.
3. Start the frontend.
4. Open http://localhost:3000.

## License
This project is for educational purposes.
