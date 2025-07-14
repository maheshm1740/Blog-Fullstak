package com.javabot.blogcms.mapper;

import com.javabot.blogcms.dto.PostRequestDto;
import com.javabot.blogcms.dto.PostResponseDto;
import com.javabot.blogcms.model.Post;

public class PostMapper {

    public static Post toEntity(PostRequestDto dto, String author){
        Post post = new Post();
        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());
        post.setAuthor(author);
        return post;
    }

    public static PostResponseDto toDto(Post post){
        return new PostResponseDto(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                post.getAuthor(),
                post.getCreatedAt(),
                post.getUpdatedAt()
        );
    }
}
