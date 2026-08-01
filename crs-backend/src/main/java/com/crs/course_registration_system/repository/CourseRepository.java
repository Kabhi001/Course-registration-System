package com.crs.course_registration_system.repository;

import com.crs.course_registration_system.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository
        extends JpaRepository<Course, Long> {

    Course findByTitle(String title);
}