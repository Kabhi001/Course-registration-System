package com.crs.course_registration_system.controller;

import com.crs.course_registration_system.entity.Course;
import com.crs.course_registration_system.service.CourseService;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/courses")
public class CourseController {

    private final CourseService service;

    public CourseController(CourseService service) {
        this.service = service;
    }

    // Add Course
    @PostMapping
    public Course addCourse(@Valid @RequestBody Course course) {
        return service.saveCourse(course);
    }

    // Get All Courses
    @GetMapping
    public List<Course> getAllCourses() {
        return service.getAllCourses();
    }

    // Update Course
    @PutMapping("/{id}")
    public Course updateCourse(
            @PathVariable Long id,
            @Valid @RequestBody Course course) {

        return service.updateCourse(id, course);
    }

    // Delete Course
    @DeleteMapping("/{id}")
    public String deleteCourse(@PathVariable Long id) {

        service.deleteCourse(id);

        return "Course Deleted Successfully";
    }

    // Get Course By ID
    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable Long id) {

        return service.getCourseById(id);
    }

}