package com.javabot.blogcms.service;

import com.javabot.blogcms.dto.PostRequestDto;
import com.javabot.blogcms.dto.PostResponseDto;
import com.javabot.blogcms.mapper.PostMapper;
import com.javabot.blogcms.model.Post;
import com.javabot.blogcms.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private  final PostRepository postRepository;

    public List<PostResponseDto> getAllPosts(){
        return postRepository.findAll()
                .stream().map(PostMapper::toDto).collect(Collectors.toList());
    }

    public List<PostResponseDto> getPostByAuthor(String author){
        return postRepository.findByAuthor(author)
                .stream().map(PostMapper::toDto).collect(Collectors.toList());
    }

    public PostResponseDto createPost(PostRequestDto dto, String author){
        Post post = PostMapper.toEntity(dto, author);
        Post savedPost = postRepository.save(post);
        return PostMapper.toDto(savedPost);
    }

    public  void deletePost(Long id){
        if(!postRepository.existsById(id)){
            throw new RuntimeException("Post not found");
        }
        postRepository.deleteById(id);
    }

    public PostResponseDto getPostById(Long id){
        Post post=postRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Post not found"));
        return PostMapper.toDto(post);
    }

    public PostResponseDto updatePost(Long id, PostRequestDto dto){
        Post post = postRepository.findById(id).orElseThrow(()->new RuntimeException("Post not found"));

        post.setContent(dto.getContent());
        post.setUpdatedAt(LocalDateTime.now());

        Post updatedPost=postRepository.save(post);
        return PostMapper.toDto(updatedPost);
    }
}
