import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Courses from "./components/Courses";
import Students from "./components/Students";
import {
  ToastProvider,
  BookOpenIcon,
  AcademicCapIcon,
  UsersIcon,
  ClockIcon
} from "./components/UIHelpers";

// ==========================================
// HOME COMPONENT - WELCOME DASHBOARD
// ==========================================

function Home() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [totalInstructors, setTotalInstructors] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // 1. Fetch courses
      const coursesResponse = await fetch("http://localhost:8080/courses");
      const coursesData = await coursesResponse.json();
      setCourses(coursesData);

      // Calculate unique instructors
      const uniqueInstructors = new Set(coursesData.map(course => course.instructor));
      setTotalInstructors(uniqueInstructors.size);

      // 2. Fetch students
      const studentsResponse = await fetch("http://localhost:8080/students");
      const studentsData = await studentsResponse.json();
      setStudents(studentsData);

      // 3. Compute enrollment counts for chart (top 4 courses)
      const computedData = coursesData.map(course => {
        const enrolledCount = studentsData.filter(student =>
          student.courses && student.courses.some(c => c.id === course.id)
        ).length;
        return {
          id: course.id,
          title: course.title,
          count: enrolledCount
        };
      })
        .sort((a, b) => b.count - a.count)
        .slice(0, 4);

      setChartData(computedData);
    } catch (error) {
      console.error("Error loading dashboard metrics:", error);
    }
  };

  // Helper to calculate bar percentage width
  const maxEnrollment = Math.max(...chartData.map(item => item.count), 1);

  return (
    <div className="home-page">
      {/* Background ambient glowing blob */}
      <div className="bg-blob-3"></div>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            🎓 Academic Excellence Simplified
          </div>
          <h1 className="hero-title">
            Streamline Your <span className="highlight">Learning Journey</span>
          </h1>
          <p className="hero-subtitle">
            Welcome to the Course Registration portal. Register for classes, manage student enrollments, and track academic stats instantly from a central, premium dashboard interface.
          </p>
          <div className="hero-actions">
            <Link to="/courses" className="btn btn-primary">
              <BookOpenIcon size={16} />
              <span>Browse Courses</span>
            </Link>
            <Link to="/students" className="btn btn-secondary">
              <AcademicCapIcon size={16} />
              <span>Register Student</span>
            </Link>
          </div>
        </div>

        <div className="hero-illustration">
          <div className="floating-card card-1">
            <div className="icon-wrap">
              <BookOpenIcon size={24} />
            </div>
            <span>Courses</span>
          </div>
          <div className="floating-card card-2">
            <div className="icon-wrap">
              <AcademicCapIcon size={24} />
            </div>
            <span>Graduation</span>
          </div>
          <div className="floating-card card-3">
            <div className="icon-wrap">
              <UsersIcon size={24} />
            </div>
            <span>Students</span>
          </div>
          <div className="floating-card card-4">
            <div className="icon-wrap">
              <ClockIcon size={24} />
            </div>
            <span>Schedules</span>
          </div>
        </div>
      </div>

      {/* Stats Summary Section */}
      <h2 className="dashboard-section-title">Dashboard Overview</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-container">
            <BookOpenIcon size={24} />
          </div>
          <div className="stat-info">
            <h3>Courses Available</h3>
            <div className="stat-number">{courses.length}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-container">
            <UsersIcon size={24} />
          </div>
          <div className="stat-info">
            <h3>Active Students</h3>
            <div className="stat-number">{students.length}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-container">
            <AcademicCapIcon size={24} />
          </div>
          <div className="stat-info">
            <h3>Expert Instructors</h3>
            <div className="stat-number">{totalInstructors}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-container">
            <ClockIcon size={24} />
          </div>
          <div className="stat-info">
            <h3>Satisfaction Rate</h3>
            <div className="stat-number">98%</div>
          </div>
        </div>
      </div>

      {/* Dynamic Widgets Area */}
      <div className="dashboard-widgets">
        {/* Course Enrollment Chart Widget */}
        <div className="widget-card">
          <h2 className="dashboard-section-title" style={{ fontSize: "20px", marginBottom: "8px" }}>
            Top Courses by Enrollment
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
            Real-time enrollment distribution across academic programs
          </p>

          <div className="chart-placeholder">
            {chartData.length === 0 ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, color: "var(--text-muted)", fontSize: "14px", fontStyle: "italic" }}>
                No active course registrations to chart.
              </div>
            ) : (
              chartData.map((item) => {
                const percentage = (item.count / maxEnrollment) * 100;
                return (
                  <div className="custom-chart-row" key={item.id}>
                    <div className="chart-label" title={item.title}>
                      {item.title}
                    </div>
                    <div className="chart-bar-container">
                      <div
                        className="chart-bar-fill"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="chart-percentage">
                      {item.count} {item.count === 1 ? "Std" : "Stds"}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Quick Actions Panel Widget */}
        <div className="widget-card">
          <h2 className="dashboard-section-title" style={{ fontSize: "20px", marginBottom: "8px" }}>
            Quick Actions
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
            Perform common administrative tasks instantly
          </p>

          <div className="quick-actions">
            <Link to="/courses" className="quick-action-btn">
              <span>Create new academic course</span>
              <span className="arrow">➔</span>
            </Link>
            <Link to="/students" className="quick-action-btn">
              <span>Register new student profile</span>
              <span className="arrow">➔</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// CORE APP ROUTER CONTENT
// ==========================================

function AppContent() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Router>
      <div className="app-container">
        {/* Navigation Bar */}
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        {/* Route Configuration */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/students" element={<Students />} />
        </Routes>

        {/* Footer */}
        <footer className="footer">
          Course Registry.Built with Abhishek
        </footer>
      </div>
    </Router>
  );
}

// ==========================================
// EXPORT MAIN WRAPPER
// ==========================================

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;
