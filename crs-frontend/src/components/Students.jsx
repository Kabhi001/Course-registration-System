import React, { useEffect, useState } from "react";
import { 
  useToast, 
  ConfirmModal, 
  SkeletonCard, 
  getAvatarColor, 
  getInitials,
  PlusIcon, 
  TrashIcon, 
  SearchIcon, 
  XMarkIcon 
} from "./UIHelpers";

function Students() {
  const { showToast } = useToast();

  // ========================================
  // STATE MANAGEMENT
  // ========================================
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [courseId, setCourseId] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Status states
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Deletion Modal states
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // ========================================
  // LIFECYCLE
  // ========================================
  useEffect(() => {
    fetchStudents();
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredStudents(students);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = students.filter((student) => {
        const matchesName = student.name.toLowerCase().includes(query);
        const matchesEmail = student.email.toLowerCase().includes(query);
        const matchesCourse = student.courses && student.courses.some(
          (c) => c.title.toLowerCase().includes(query)
        );
        return matchesName || matchesEmail || matchesCourse;
      });
      setFilteredStudents(filtered);
    }
  }, [searchQuery, students]);

  // ========================================
  // API FUNCTIONS
  // ========================================

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/students");
      
      if (!response.ok) {
        throw new Error(`Failed to fetch students: ${response.statusText}`);
      }
      
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      console.error("Error fetching students:", err);
      showToast("Could not load students from backend server.", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:8080/courses");
      if (!response.ok) {
        throw new Error(`Failed to fetch courses: ${response.statusText}`);
      }
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      console.error("Error fetching courses for dropdown:", err);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!name || !email || !courseId) return;
    
    try {
      setSubmitting(true);
      
      // Find the selected course object
      const selectedCourse = courses.find(course => course.id === parseInt(courseId));
      
      const newStudent = {
        name,
        email,
        courses: selectedCourse ? [selectedCourse] : [],
      };

      const response = await fetch("http://localhost:8080/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register student");
      }

      await fetchStudents();
      resetForm();
      showToast("Student registered successfully!", "success");
    } catch (err) {
      console.error("Error registering student:", err);
      showToast(`Failed to register student: ${err.message}`, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const executeDelete = async () => {
    if (!deleteId) return;
    try {
      const response = await fetch(`http://localhost:8080/students/${deleteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete student");
      }

      await fetchStudents();
      showToast("Student profile deleted successfully!", "success");
    } catch (err) {
      console.error("Error deleting student:", err);
      showToast(`Failed to delete student: ${err.message}`, "error");
    } finally {
      setConfirmOpen(false);
      setDeleteId(null);
    }
  };

  // ========================================
  // HELPER FUNCTIONS
  // ========================================

  const resetForm = () => {
    setName("");
    setEmail("");
    setCourseId("");
    setIsFormOpen(false);
  };

  // ========================================
  // RENDER
  // ========================================
  return (
    <div className="students-container">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Registered Students</h1>
        
        <div className="page-actions">
          {/* Search bar */}
          <div className="search-wrapper">
            <span className="search-icon"><SearchIcon /></span>
            <input
              type="text"
              placeholder="Search by name, email, or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Toggle form button */}
          {!isFormOpen && (
            <button 
              className="btn btn-primary" 
              onClick={() => setIsFormOpen(true)}
            >
              <PlusIcon size={16} />
              <span>Register Student</span>
            </button>
          )}
        </div>
      </div>

      {/* Form Drawer (Slide Down Panel) */}
      {isFormOpen && (
        <div className="form-drawer">
          <div className="form-drawer-header">
            <h2>New Student Registration</h2>
            <button className="form-drawer-close" onClick={resetForm}>
              <XMarkIcon size={18} />
            </button>
          </div>

          <form onSubmit={handleAddStudent} className="grid-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-input"
                disabled={submitting}
              />
            </div>
            
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="e.g. john.doe@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
                disabled={submitting}
              />
            </div>

            <div className="form-group">
              <label>Primary Course Enrollment</label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                required
                className="form-select"
                disabled={submitting}
              >
                <option value="">Choose a course...</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                onClick={resetForm} 
                className="btn btn-secondary"
                disabled={submitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? "Registering..." : "Register Student"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Student Cards Grid */}
      {loading ? (
        <div className="student-grid">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <div className="student-grid">
          {filteredStudents.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🎓</div>
              <h3>No Students Found</h3>
              <p>
                {searchQuery 
                  ? "We couldn't find any students matching your search criteria. Try modifying your search term."
                  : "No students are currently registered. Register your first student to see them on the dashboard!"}
              </p>
              {!searchQuery && (
                <button className="btn btn-primary" onClick={() => setIsFormOpen(true)}>
                  <PlusIcon size={16} />
                  <span>Register First Student</span>
                </button>
              )}
            </div>
          ) : (
            filteredStudents.map((student) => (
              <div className="student-card" key={student.id}>
                <div>
                  <div className="student-card-top">
                    <div 
                      className="student-avatar" 
                      style={{ background: getAvatarColor(student.name) }}
                    >
                      {getInitials(student.name)}
                    </div>
                    <div className="student-card-info">
                      <h3>{student.name}</h3>
                      <p>{student.email}</p>
                    </div>
                  </div>

                  <div className="student-courses-box">
                    <h4 className="student-courses-label">Enrolled Courses</h4>
                    <div className="student-course-tags">
                      {student.courses && student.courses.length > 0 ? (
                        student.courses.map((c) => (
                          <span className="course-tag" key={c.id}>
                            📚 {c.title}
                          </span>
                        ))
                      ) : (
                        <span className="no-courses-tag">No courses enrolled</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="card-actions" style={{ marginTop: "auto" }}>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleDeleteClick(student.id)}
                    style={{ width: "100%" }}
                  >
                    <TrashIcon size={14} />
                    <span>Delete Profile</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Custom Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmOpen}
        title="Delete Student Profile?"
        message="Are you sure you want to delete this student's profile? This will remove all their course registration records. This action cannot be undone."
        onConfirm={executeDelete}
        onCancel={() => setConfirmOpen(false)}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

export default Students;
