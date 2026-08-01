# Course Registration System

A full-stack course registration application with a React frontend and a Spring Boot backend. It allows users to manage courses, register students, and view dashboard-style academic statistics.

## Features
- Manage course records
- Register and manage students
- Enroll students in courses
- View dashboard statistics and summaries
- Use REST APIs backed by MySQL

## Project Structure
- crs-backend/ - Spring Boot REST API and database connection
- crs-frontend/ - React dashboard UI

## Tech Stack
- Backend: Java 17, Spring Boot 3, Spring Data JPA, MySQL
- Frontend: React 19, React Router, Create React App

## Prerequisites
Before running the project, make sure you have:
- Java 17 or newer
- Maven (or use the included Maven wrapper)
- Node.js and npm
- MySQL installed and running locally

## 1. Clone the Repository
```bash
git clone https://github.com/Kabhi001/Course-registration-System.git
cd Course-registration-System
```

## 2. Set Up the Database
Create a MySQL database named `course_db`.

If needed, update the database settings in:
- crs-backend/src/main/resources/application.properties

Default configuration expects:
- URL: jdbc:mysql://localhost:3306/course_db
- Username: root
- Password: empty

You can also override these values with environment variables:
```bash
set DB_URL=jdbc:mysql://localhost:3306/course_db
set DB_USERNAME=root
set DB_PASSWORD=
```

## 3. Run the Backend
Open a terminal and run:

### Windows
```powershell
cd crs-backend
./mvnw.cmd spring-boot:run
```

### macOS / Linux
```bash
cd crs-backend
./mvnw spring-boot:run
```

The backend will start on:
- http://localhost:8080

## 4. Run the Frontend
Open a second terminal and run:
```bash
cd crs-frontend
npm install
npm start
```

The frontend will start on:
- http://localhost:3000

## 5. Open the Application
Once both services are running:
- Open http://localhost:3000 in your browser
- The React app will call the backend at http://localhost:8080

## Common Notes
- If the backend fails to connect to MySQL, verify that MySQL is running and the credentials are correct.
- If the frontend cannot load data, confirm that the backend is running on port 8080.
- The app uses CORS for localhost:3000, so the frontend should be started from that address.

## License
This project is intended for educational and learning purposes.
