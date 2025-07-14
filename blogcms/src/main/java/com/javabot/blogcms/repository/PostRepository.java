package com.javabot.blogcms.repository;

import com.javabot.blogcms.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByAuthor(String author);
}
