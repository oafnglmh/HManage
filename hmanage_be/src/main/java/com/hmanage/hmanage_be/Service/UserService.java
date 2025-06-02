package com.hmanage.hmanage_be.Service;

import com.hmanage.hmanage_be.Exceptions.AppException;
import com.hmanage.hmanage_be.dto.CredentialsDto;
import com.hmanage.hmanage_be.dto.SignUpDto;
import com.hmanage.hmanage_be.dto.UserDto;
import com.hmanage.hmanage_be.mappers.UserMapper;
import com.hmanage.hmanage_be.models.User;
import com.hmanage.hmanage_be.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final  PasswordEncoder passwordEncoder;
    public UserDto findByLogin(String username){
        User user = userRepository.findByUsername(username)
                .orElseThrow(()-> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        return userMapper.toUserDto(user);
    }
    public UserDto login(CredentialsDto credentialsDto){
        System.out.println("data" + credentialsDto);
       User user = userRepository.findByUsername(credentialsDto.getUsername()).orElseThrow(()->new AppException("Unknown user", HttpStatus.NOT_FOUND));
       if(passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()),user.getPasswordHash())){
           return userMapper.toUserDto(user);
       }
       throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }
    public UserDto register (SignUpDto userDto){
        Optional<User> optionalUser = userRepository.findByUsername(userDto.getUsername());
        if(optionalUser.isPresent()){
            throw new AppException("User already exists", HttpStatus.BAD_REQUEST);
        }
        User user = userMapper.signUpToUser(userDto);
        user.setPasswordHash(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));
        User savedUser = userRepository.save(user);
        return userMapper.toUserDto(savedUser);
    }
}
