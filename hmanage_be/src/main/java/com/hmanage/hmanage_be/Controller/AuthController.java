package com.hmanage.hmanage_be.Controller;

import com.hmanage.hmanage_be.Service.UserService;
import com.hmanage.hmanage_be.config.UserAuthProvider;
import com.hmanage.hmanage_be.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class AuthController {
    private final UserService userService;
    private final UserAuthProvider userAuthProvider;
    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody CredentialsDto credentialsDto){
        UserDto user = userService.login(credentialsDto);
        user.setToken(userAuthProvider.createToken(user.getUsername()));
        return ResponseEntity.ok(user);
    }
    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody SignUpDto signUpDto){
        UserDto user = userService.register(signUpDto);
        user.setToken(userAuthProvider.createToken(user.getUsername()));
        return ResponseEntity.created(URI.create("/users/"+user.getUserId()))
                    .body(user);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<UserInfoDto>> getUserById(@PathVariable Long id){
        List<UserInfoDto> inf = userService.getById(id);
        return ResponseEntity.ok(inf);
    }

    @GetMapping("/user/getAll")
    public ResponseEntity<List<UserInfoDto>> getAll(){
        List<UserInfoDto> inf = userService.getAll();
        return ResponseEntity.ok(inf);
    }
}
