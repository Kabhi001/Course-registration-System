package com.crs.course_registration_system.controller;

import com.crs.course_registration_system.entity.Student;
import com.crs.course_registration_system.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    // Register Student
    @PostMapping
    public Student addStudent(@Valid @RequestBody Student student) {
        return service.saveStudent(student);
    }

    // Get All Students
    @GetMapping
    public List<Student> getAllStudents() {
        return service.getAllStudents();
    }

    // Get Student By ID
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {

        return service.getStudentById(id);
    }

    // Update Student
    @PutMapping("/{id}")
    public Student updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody Student student) {

        return service.updateStudent(id, student);
    }

    // Delete Student
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {

        service.deleteStudent(id);

        return "Student Deleted Successfully";
    }

    // Get Students By Course ID
    @GetMapping("/course/{courseId}")
    public List<Student> getStudentsByCourse(
            @PathVariable Long courseId) {

        return service.getStudentsByCourseId(courseId);
    }
}