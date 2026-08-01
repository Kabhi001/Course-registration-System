package com.crs.course_registration_system.service;

import com.crs.course_registration_system.entity.Student;
import com.crs.course_registration_system.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository repo;

    public StudentService(StudentRepository repo) {
        this.repo = repo;
    }

    // Save Student
    public Student saveStudent(Student student) {
        return repo.save(student);
    }

    // Get All Students
    public List<Student> getAllStudents() {
        return repo.findAll();
    }

    // Get Student By ID
    public Student getStudentById(Long id) {
        return repo.findById(id).orElse(null);
    }

    // Update Student
    public Student updateStudent(Long id, Student updatedStudent) {
        Student existingStudent = repo.findById(id).orElse(null);
        if (existingStudent == null) {
            return null;
        }

        existingStudent.setName(updatedStudent.getName());
        existingStudent.setEmail(updatedStudent.getEmail());
        existingStudent.setCourses(updatedStudent.getCourses());

        return repo.save(existingStudent);
    }

    // Delete Student
    public void deleteStudent(Long id) {
        repo.deleteById(id);
    }

    // Get Students By Course ID
    public List<Student> getStudentsByCourseId(Long courseId) {
        return repo.findByCoursesId(courseId);
    }
}