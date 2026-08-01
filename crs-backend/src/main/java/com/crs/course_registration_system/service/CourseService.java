package com.crs.course_registration_system.service;

import com.crs.course_registration_system.entity.Course;
import com.crs.course_registration_system.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository repo;

    public CourseService(CourseRepository repo) {
        this.repo = repo;
    }

    // Save Course
    public Course saveCourse(Course course) {
        return repo.save(course);
    }

    // Get All Courses
    public List<Course> getAllCourses() {
        return repo.findAll();
    }

    // Get Course By ID
    public Course getCourseById(Long id) {
        return repo.findById(id).orElse(null);
    }

    // Search Course By Title
    public Course searchByTitle(String title) {
        return repo.findByTitle(title);
    }

    // Update Course
    public Course updateCourse(Long id, Course updatedCourse) {
        Course existingCourse = repo.findById(id).orElse(null);
        if (existingCourse == null) {
            return null;
        }

        existingCourse.setTitle(updatedCourse.getTitle());
        existingCourse.setDuration(updatedCourse.getDuration());
        existingCourse.setInstructor(updatedCourse.getInstructor());

        return repo.save(existingCourse);
    }

    // Delete Course
    public void deleteCourse(Long id) {
        repo.deleteById(id);
    }
}