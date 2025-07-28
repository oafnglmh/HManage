package com.hmanage.hmanage_be.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hmanage.hmanage_be.Constants.ModelConstants;
import com.hmanage.hmanage_be.Exceptions.AppException;
import com.hmanage.hmanage_be.dto.*;
import com.hmanage.hmanage_be.mappers.UserMapper;
import com.hmanage.hmanage_be.models.*;
import com.hmanage.hmanage_be.repositories.QuestionRepository;
import com.hmanage.hmanage_be.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UserService {
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final  PasswordEncoder passwordEncoder;
    public UserDto findByLogin(String username){
        User user = userRepository.findByUsername(username)
                .orElseThrow(()-> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        return userMapper.toUserDto(user);
    }
    public UserDto login(CredentialsDto credentialsDto){
       User user = userRepository.findByUsername(credentialsDto.getUsername()).orElseThrow(()->new AppException("Unknown user", HttpStatus.NOT_FOUND));
       if(passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()),user.getPasswordHash())){
           return userMapper.toUserDto(user);
       }
       throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }
    public UserDto register(SignUpDto userDto) {
        Optional<User> optionalUser = userRepository.findByUsername(userDto.getUsername());
        if (optionalUser.isPresent()) {
            throw new AppException("User already exists", HttpStatus.BAD_REQUEST);
        }

        User user = userMapper.signUpToUser(userDto);
        user.setPasswordHash(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));

        try {
            Thread.sleep(1);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        String timestampStr = LocalDateTime.now().format(formatter);
        String prefix = ModelConstants.USER.toString();
        String userIdStr = prefix + timestampStr;
        long userId = Long.parseLong(userIdStr);


        user.setUserId(userId);

        User savedUser = userRepository.save(user);
        return userMapper.toUserDto(savedUser);
    }

    public List<UserInfoDto> getById(Long id) {
        List<Object[]> data = userRepository.findUserInf(id);
        List<UserInfoDto> result = new ArrayList<>();

        if (data.isEmpty()) return result;

        Object[] row = data.get(0);
        User us = (User) row[0];
        Document d = (Document) row[1];

        UserInfoDto dto = new UserInfoDto();
        dto.setUserId(us.getUserId());
        dto.setFirstName(us.getFirst_name());
        dto.setLastName(us.getLast_name());
        dto.setFullName(
                (us.getFirst_name() != null ? us.getFirst_name() : "") + " " +
                        (us.getLast_name() != null ? us.getLast_name() : "")
        );
        dto.setEmail(us.getEmail());
        dto.setImages(d != null ? d.getFilePath() : null);

        // ----- Xử lý Project, Image, Favourite -----
        List<Object[]> data02 = userRepository.findUserInfPrj(id);
        Map<Long, QuestionDto> dtoMap = new LinkedHashMap<>();

        for (Object[] row02 : data02) {
            Project prj = (Project) row02[0];
            Document postDoc = (Document) row02[1];
            Favourite fvr = (Favourite) row02[2];

            Long projectId = prj.getProjectId();
            QuestionDto dto01 = dtoMap.getOrDefault(projectId, new QuestionDto());

            if (!dtoMap.containsKey(projectId)) {
                dto01.setProjectId(projectId);
                dto01.setUserId(prj.getUserId());
                dto01.setCode(prj.getCode());
                dto01.setMinutes(prj.getMinutes());
                dto01.setInf02(prj.getInf02());
                dto01.setName(prj.getName());
                dto01.setDescription(prj.getDescription());
                dto01.setStatus(prj.getStatus());
                dto01.setCreatedAt(prj.getCreatedAt());
                dto01.setUpdatedAt(prj.getUpdatedAt());
                dto01.setParentId(prj.getParentId());
                dto01.setImages(new ArrayList<>());
                dto01.setUserLikeId(new ArrayList<>());
                dto01.setO_Comments(new ArrayList<>());
            }

            if (postDoc != null && postDoc.getFilePath() != null) {
                List<String> images = dto01.getImages();
                if (!images.contains(postDoc.getFilePath())) {
                    images.add(postDoc.getFilePath());
                }
            }

            if (fvr != null) {
                List<String> userLikeIds = dto01.getUserLikeId();
                String favUserId = String.valueOf(fvr.getUserId());
                if (!userLikeIds.contains(favUserId)) {
                    userLikeIds.add(favUserId);
                    dto01.setCountLike(userLikeIds.size());
                }
            }

            dtoMap.put(projectId, dto01);
        }

        // ----- Xử lý Comment -----
        List<Long> projectIds = new ArrayList<>(dtoMap.keySet());
        if (!projectIds.isEmpty()) {
            List<Object[]> commentData = questionRepository.findCommentsByProjectIds(projectIds);

            for (Object[] row03 : commentData) {
                Comment cmt = (Comment) row03[0];
                User us2 = (User) row03[1];
                Long projectId = cmt.getProjectId();

                if (!dtoMap.containsKey(projectId)) continue;

                QuestionDto dto02 = dtoMap.get(projectId);
                List<CommentDto> commentList = dto02.getO_Comments();
                if (commentList == null) commentList = new ArrayList<>();

                CommentDto commentDto = new CommentDto();
                commentDto.setCommentId(cmt.getCommentId());
                commentDto.setText(cmt.getText());
                commentDto.setProjectId(cmt.getProjectId());
                commentDto.setUserId(cmt.getUserId());
                commentDto.setCreatedAt(cmt.getCreatedAt());
                commentDto.setUserName(us2 != null ? us2.getFirst_name() + " " + us2.getLast_name() : null);

                commentList.add(commentDto);
                dto02.setO_Comments(commentList);
            }
        }

        dto.setO_Project(new ArrayList<>(dtoMap.values()));
        result.add(dto);

        return result;
    }





}
