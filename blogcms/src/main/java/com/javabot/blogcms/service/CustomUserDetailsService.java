package com.javabot.blogcms.service;

import com.javabot.blogcms.model.Users;
import com.javabot.blogcms.model.UserPrincipal;
import com.javabot.blogcms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users users =userRepository.findByUsername(username);

        if(users ==null){
            throw new UsernameNotFoundException("user not found");
        }
        return new UserPrincipal(users);
    }
}
