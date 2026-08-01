import React, { useEffect, useState } from "react";
import { 
  useToast, 
  ConfirmModal, 
  SkeletonCard, 
  getAvatarColor, 
  getInitials,
  ClockIcon, 
  PlusIcon, 
  TrashIcon, 
  PencilIcon, 
  SearchIcon, 
  XMarkIcon 
} from "./UIHelpers";

function Courses() {
  const { showToast } = useToast();

  // ========================================
  // STATE MANAGEMENT
  // ========================================
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Form states
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [instructor, setInstructor] = useState("");
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
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
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCourses(courses);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = courses.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.instructor.toLowerCase().includes(query)
      );
      setFilteredCourses(filtered);
    }
  }, [searchQuery, courses]);

  // ========================================
  // API FUNCTIONS
  // ========================================

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/courses");
      
      if (!response.ok) {
        throw new Error(`Failed to fetch courses: ${response.statusText}`);
      }
      
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      console.error("Error fetching courses:", err);
      showToast("Could not load courses from backend server.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!title || !duration || !instructor) return;
    
    try {
      setSubmitting(true);
      const newCourse = { title, duration, instructor };

      const response = await fetch("http://localhost:8080/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add course");
      }

      await fetchCourses();
      resetForm();
      showToast("Course added successfully!", "success");
    } catch (err) {
      console.error("Error adding course:", err);
      showToast(`Failed to add course: ${err.message}`, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    if (!title || !duration || !instructor || !editId) return;
    
    try {
      setSubmitting(true);
      const updatedCourse = { title, duration, instructor };

      const response = await fetch(`http://localhost:8080/courses/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCourse),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update course");
      }

      await fetchCourses();
      resetForm();
      showToast("Course updated successfully!", "success");
    } catch (err) {
      console.error("Error updating course:", err);
      showToast(`Failed to update course: ${err.message}`, "error");
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
      const response = await fetch(`http://localhost:8080/courses/${deleteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete course");
      }

      await fetchCourses();
      showToast("Course deleted successfully!", "success");
    } catch (err) {
      console.error("Error deleting course:", err);
      showToast(`Failed to delete course: ${err.message}`, "error");
    } finally {
      setConfirmOpen(false);
      setDeleteId(null);
    }
  };

  // ========================================
  // HELPER FUNCTIONS
  // ========================================

  const startEdit = (course) => {
    setTitle(course.title);
    setDuration(course.duration);
    setInstructor(course.instructor);
    setEditId(course.id);
    setIsEditing(true);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setTitle("");
    setDuration("");
    setInstructor("");
    setIsEditing(false);
    setEditId(null);
    setIsFormOpen(false);
  };

  // ========================================
  // RENDER
  // ========================================
  return (
    <div className="courses-container">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Available Courses</h1>
        
        <div className="page-actions">
          {/* Search bar */}
          <div className="search-wrapper">
            <span className="search-icon"><SearchIcon /></span>
            <input
              type="text"
              placeholder="Search by title or instructor..."
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
              <span>Add Course</span>
            </button>
          )}
        </div>
      </div>

      {/* Form Drawer (Slide Down Panel) */}
      {isFormOpen && (
        <div className="form-drawer">
          <div className="form-drawer-header">
            <h2>{isEditing ? "Edit Course Information" : "Create New Course"}</h2>
            <button className="form-drawer-close" onClick={resetForm}>
              <XMarkIcon size={18} />
            </button>
          </div>

          <form onSubmit={isEditing ? handleUpdateCourse : handleAddCourse} className="grid-form">
            <div className="form-group">
              <label>Course Title</label>
              <input
                type="text"
                placeholder="e.g. Modern Web Development"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="form-input"
                disabled={submitting}
              />
            </div>
            
            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                placeholder="e.g. 8 weeks"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                className="form-input"
                disabled={submitting}
              />
            </div>

            <div className="form-group">
              <label>Instructor Name</label>
              <input
                type="text"
                placeholder="e.g. Prof. Sarah Jenkins"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                required
                className="form-input"
                disabled={submitting}
              />
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
                {submitting ? "Saving..." : (isEditing ? "Update Course" : "Add Course")}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Course Cards Grid */}
      {loading ? (
        <div className="course-grid">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <div className="course-grid">
          {filteredCourses.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📚</div>
              <h3>No Courses Found</h3>
              <p>
                {searchQuery 
                  ? "We couldn't find any courses matching your search term. Try checking for typos or searching something else!"
                  : "There are currently no courses registered in the database. Get started by clicking the 'Add Course' button!"}
              </p>
              {!searchQuery && (
                <button className="btn btn-primary" onClick={() => setIsFormOpen(true)}>
                  <PlusIcon size={16} />
                  <span>Register First Course</span>
                </button>
              )}
            </div>
          ) : (
            filteredCourses.map((course) => (
              <div className="course-card" key={course.id}>
                <div>
                  <div className="card-header-main">
                    <h2 className="card-title">{course.title}</h2>
                    <span className="card-badge">
                      <ClockIcon size={12} />
                      {course.duration}
                    </span>
                  </div>

                  <div className="card-meta-list">
                    <div className="card-meta-item">
                      <div 
                        className="student-avatar" 
                        style={{ 
                          background: getAvatarColor(course.instructor),
                          width: "32px",
                          height: "32px",
                          fontSize: "12px",
                          borderRadius: "10px"
                        }}
                      >
                        {getInitials(course.instructor)}
                      </div>
                      <span>
                        Instructor: <strong>{course.instructor}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="card-actions">
                  <button className="btn btn-secondary" onClick={() => startEdit(course)}>
                    <PencilIcon size={14} />
                    <span>Edit</span>
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDeleteClick(course.id)}>
                    <TrashIcon size={14} />
                    <span>Delete</span>
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
        title="Delete Course?"
        message="Are you sure you want to delete this course? Active student enrollments for this course may be impacted. This action cannot be undone."
        onConfirm={executeDelete}
        onCancel={() => setConfirmOpen(false)}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

export default Courses;
