package com.javabot.blogcms.controller;

import com.javabot.blogcms.dto.PostRequestDto;
import com.javabot.blogcms.dto.PostResponseDto;
import com.javabot.blogcms.service.PostService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/post")
public class PostController {

    private final PostService postService;

    @GetMapping
    public ResponseEntity<List<PostResponseDto>> getAllPosts(){
        List<PostResponseDto> posts= postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }
    @Transactional
    @GetMapping("/{author}")
    public ResponseEntity<?> getPostByAuthor(@PathVariable String author){
        List<PostResponseDto> posts=postService.getPostByAuthor(author);
        if(posts.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Author not found");
        }
        return ResponseEntity.ok(posts);
    }
    @PostMapping
    public ResponseEntity<PostResponseDto> createPost(@RequestBody PostRequestDto dto ){
        Authentication auth= SecurityContextHolder.getContext().getAuthentication();
        String author=auth.getName();
        PostResponseDto response=postService.createPost(dto,author);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/id/{id}")
    public ResponseEntity<PostResponseDto> getPostById(@PathVariable Long id){
        PostResponseDto post=postService.getPostById(id);
        return ResponseEntity.ok(post);
    }
    @PutMapping("/{id}")
    public ResponseEntity<PostResponseDto> updatePost(@PathVariable Long id,@RequestBody PostRequestDto dto){
        PostResponseDto updatedPost = postService.updatePost(id,dto);
        return ResponseEntity.ok(updatedPost);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id){
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}
