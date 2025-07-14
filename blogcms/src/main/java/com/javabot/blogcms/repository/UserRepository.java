package com.javabot.blogcms.repository;

import com.javabot.blogcms.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users,Long> {
    Users findByUsername(String username);
}
