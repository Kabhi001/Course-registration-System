# Course Registration System

A full-stack course registration platform for managing courses, students, and academic enrollment workflows with a modern React dashboard and a Spring Boot backend.

---

## Tech Stack

- Backend: Java 17, Spring Boot 3, Spring Data JPA, MySQL
- Frontend: React 19, React Router, Create React App
- Build Tools: Maven, npm

---

## Prerequisites

- Java 17 or newer
- Maven 3.8+
- Node.js 18+
- MySQL installed and running locally

---

## Running the Application

### Step 1 — Start the Backend

Open a terminal and run:

```bash
cd crs-backend
./mvnw spring-boot:run
```

For Windows PowerShell, use:

```powershell
cd crs-backend
./mvnw.cmd spring-boot:run
```

The backend will start on http://localhost:8080.

### Step 2 — Start the Frontend

Open a second terminal and run:

```bash
cd crs-frontend
npm install
npm start
```

The frontend will start on http://localhost:3000.

---

## Database Setup

Create a MySQL database named `course_db`.

Update the database connection settings in:

- crs-backend/src/main/resources/application.properties

Default configuration expects:

- URL: `jdbc:mysql://localhost:3306/course_db`
- Username: `root`
- Password: empty

You can also override these values with environment variables:

```bash
set DB_URL=jdbc:mysql://localhost:3306/course_db
set DB_USERNAME=root
set DB_PASSWORD=
```

---

## Accessing the App

Open your browser to:

- http://localhost:3000

---

## Features

### 📚 Course Management
- Add, view, update, and delete courses
- Track course details such as title, instructor, and schedule

### 👨‍🎓 Student Management
- Register students
- Link students to course enrollments
- View student records in the dashboard

### 📊 Dashboard Overview
- View summary statistics for courses and students
- Monitor academic activity through the UI

---

## Project Structure

```text
course-registration-system/
├── crs-backend/
│   └── src/main/java/com/crs/course_registration_system/
├── crs-frontend/
│   └── src/
```

---

## Notes

- Make sure MySQL is running before starting the backend.
- If the frontend cannot load data, confirm that the backend is running on port 8080.
- The app is intended for educational and learning purposes.
