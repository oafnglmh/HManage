package com.hmanage.hmanage_be.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hmanage.hmanage_be.Constants.ModelConstants;
import com.hmanage.hmanage_be.Constants.StatusConstants;
import com.hmanage.hmanage_be.dto.*;
import com.hmanage.hmanage_be.models.*;
import com.hmanage.hmanage_be.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RequiredArgsConstructor
@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final DocumentRepository documentRepository;
    private final FavouriteReponsitory favouriteRepository;
    private final CommentRepository commentRepository;
    private final SimpMessagingTemplate messagingTemplate;
    public QuestionDto add(QuestionDto qs) {
        String status = qs.getStatus();
        if (status == null) {
            status = String.valueOf(StatusConstants.ACTIVE);
            qs.setStatus(status);

        }

        LocalDateTime now = LocalDateTime.now();
        String timestampStr = now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        Timestamp nowTimestamp = Timestamp.valueOf(now);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto dto = (UserDto) authentication.getPrincipal();

        Project prj = new Project();
        prj.setName(qs.getName());
        prj.setDescription(qs.getDescription());
        prj.setMinutes(qs.getMinutes());
        String prefix;
        switch (status) {
            case "1":
                prefix = "QUES";
                break;
            case "10":
                prefix = "ANSW";
                break;
            case "20":
                prefix = "SNS";
                break;
            default:
                prefix = "UNKN";
                break;
        }

        prj.setCode(prefix + "-" + timestampStr);
        prj.setProjectId(generateId(ModelConstants.PROJECT.toString(), timestampStr));
        prj.setUserId(dto.getUserId());
        prj.setInf02(qs.getInf02());
        prj.setParentId(qs.getParentId());
        prj.setStatus(qs.getStatus());
        prj.setCreatedAt(nowTimestamp);
        try {
            if (qs.getInf01() != null) {
                prj.setInf01(new ObjectMapper().writeValueAsString(qs.getInf01()));
            }
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi chuyển inf01 sang JSON", e);
        }

        questionRepository.save(prj);

        if (qs.getAvatar() != null && !qs.getAvatar().isEmpty()) {
            Document doc = new Document();
            doc.setDocumentId(generateId(ModelConstants.DOCUMENT.toString(), timestampStr));
            doc.setProjectId(prj.getProjectId());
            doc.setFilePath(qs.getAvatar());
            doc.setUploadedAt(nowTimestamp);
            documentRepository.save(doc);
        }
        if (qs.getImages() != null && !qs.getImages().isEmpty()) {
            int count = 1;
            for (String base64Media : qs.getImages()) {
                try {
                    String[] parts = base64Media.split(",");
                    if (parts.length != 2) continue;

                    String meta = parts[0];
                    String base64Data = parts[1];

                    String extension;
                    if (meta.contains("image/jpeg")) extension = ".jpg";
                    else if (meta.contains("image/png")) extension = ".png";
                    else if (meta.contains("image/gif")) extension = ".gif";
                    else if (meta.contains("video/mp4")) extension = ".mp4";
                    else if (meta.contains("video/webm")) extension = ".webm";
                    else if (meta.contains("video/ogg")) extension = ".ogg";
                    else extension = ".bin";

                    byte[] fileBytes = Base64.getDecoder().decode(base64Data);
                    String fileName = "SNS_" + timestampStr + "_" + count + extension;

                    String folderPath = "E:/HManage/hmanage_fe/public/uploaded-media/";
                    File folder = new File(folderPath);
                    if (!folder.exists()) folder.mkdirs();

                    String path = folderPath + fileName;

                    try (FileOutputStream fos = new FileOutputStream(path)) {
                        fos.write(fileBytes);
                    }

                    Document doc = new Document();
                    doc.setDocumentId(generateId(ModelConstants.DOCUMENT.toString(), timestampStr + count));
                    doc.setProjectId(prj.getProjectId());
                    doc.setFilePath(fileName);
                    doc.setUploadedAt(nowTimestamp);
                    documentRepository.save(doc);

                    count++;

                } catch (Exception e) {
                    e.printStackTrace();
                    throw new RuntimeException("Lỗi khi lưu media vào ổ đĩa", e);
                }
            }
        }



        return qs;
    }

    private long generateId(String model, String timestampStr) {
        return Long.parseLong(model + timestampStr);
    }

    public List<QuestionDto> getAllQuestions() {
        List<Object[]> data = questionRepository.findAllQuestionsWithDocument();
        List<QuestionDto> result = new ArrayList<>();

        ObjectMapper mapper = new ObjectMapper();

        for (Object[] row : data) {
            Project prj = (Project) row[0];
            Document doc = (Document) row[1];

            QuestionDto dto = new QuestionDto();
            dto.setName(prj.getName());
            dto.setDescription(prj.getDescription());
            dto.setMinutes(prj.getMinutes());
            dto.setAvatar(doc != null ? doc.getFilePath() : null);
            dto.setCode(prj.getCode());
            dto.setProjectId(prj.getProjectId());
            dto.setCreatedAt(prj.getCreatedAt());
            dto.setUserId(prj.getUserId());
            dto.setStatus(prj.getStatus());
            try {
                dto.setInf01((List<QuestionItemDto>) mapper.readValue(prj.getInf01(), Object.class));
            } catch (Exception e) {
                throw new RuntimeException("Lỗi khi parse inf01 từ JSON", e);
            }

            result.add(dto);
        }
        System.out.println("data lấy ra:" + result);
        return result;
    }

    public List<QuestionDto> getById(Long id){
        List<Object[]> data = questionRepository.findProjectWithDocumentsById(id);
        List<QuestionDto> result = new ArrayList<>();

        ObjectMapper mapper = new ObjectMapper();

        for (Object[] row : data) {
            Project prj = (Project) row[0];
            Document doc = (Document) row[1];

            QuestionDto dto = new QuestionDto();
            dto.setName(prj.getName());
            dto.setDescription(prj.getDescription());
            dto.setMinutes(prj.getMinutes());
            dto.setAvatar(doc != null ? doc.getFilePath() : null);
            dto.setCode(prj.getCode());
            dto.setProjectId(prj.getProjectId());
            dto.setCreatedAt(prj.getCreatedAt());
            dto.setUserId(prj.getUserId());
            dto.setStatus(prj.getStatus());
            try {
                dto.setInf01((List<QuestionItemDto>) mapper.readValue(prj.getInf01(), Object.class));
            } catch (Exception e) {
                throw new RuntimeException("Lỗi khi parse inf01 từ JSON", e);
            }

            result.add(dto);
        }

        return result;
    }

    public List<QuestionDto> getSummaryById(Long id){
        List<Object[]> data = questionRepository.findProjectWithUserById(id);
        List<QuestionDto> result = new ArrayList<>();

        ObjectMapper mapper = new ObjectMapper();

        for (Object[] row : data) {
            Project prj = (Project) row[0];
            User us = (User) row[1];

            QuestionDto dto = new QuestionDto();
            dto.setInf02(prj.getInf02());
            dto.setUserName(us != null ?
                    (us.getFirst_name() != null ? us.getFirst_name() : "") +
                            " " +
                            (us.getLast_name() != null ? us.getLast_name() : "")
                    : null);

            result.add(dto);
        }

        return result;
    }

    public QuestionDto update(QuestionDto dto) {
        LocalDateTime now = LocalDateTime.now();
        String timestampStr = now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        Timestamp nowTimestamp = Timestamp.valueOf(now);

        Project project = questionRepository.findById(dto.getProjectId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Project với ID: " + dto.getProjectId()));

        if (dto.getName() != null) project.setName(dto.getName());
        if (dto.getDescription() != null) project.setDescription(dto.getDescription());
        if (dto.getMinutes() != null) project.setMinutes(dto.getMinutes());
        if (dto.getStatus() != null) project.setStatus(dto.getStatus());
        if (dto.getCode() != null) project.setCode(dto.getCode());
        if (dto.getUserId() != null) project.setUserId(dto.getUserId());
        if (dto.getCreatedAt() != null) project.setCreatedAt(dto.getCreatedAt());


        if (dto.getInf01() != null) {
            try {
                ObjectMapper mapper = new ObjectMapper();
                String jsonInf01 = mapper.writeValueAsString(dto.getInf01());
                project.setInf01(jsonInf01);
            } catch (Exception e) {
                throw new RuntimeException("Lỗi khi convert inf01 thành JSON", e);
            }
        }

        project = questionRepository.save(project);

        List<Document> currentDocs = documentRepository.findAllByProjectId(dto.getProjectId());
        List<Document> docsToUnlink = new ArrayList<>();
        List<Document> docsToInsert = new ArrayList<>();

        Set<String> incomingFilePaths = new HashSet<>();
        int count = 1;

        if (dto.getImages() != null && !dto.getImages().isEmpty()) {
            for (String base64Media : dto.getImages()) {

                if (base64Media.startsWith("SNS_")) {
                    incomingFilePaths.add(base64Media);
                    continue;
                }

                try {
                    String[] parts = base64Media.split(",");
                    if (parts.length != 2) continue;

                    String meta = parts[0];
                    String base64Data = parts[1];

                    String extension;
                    if (meta.contains("image/jpeg")) extension = ".jpg";
                    else if (meta.contains("image/png")) extension = ".png";
                    else if (meta.contains("image/gif")) extension = ".gif";
                    else if (meta.contains("video/mp4")) extension = ".mp4";
                    else if (meta.contains("video/webm")) extension = ".webm";
                    else if (meta.contains("video/ogg")) extension = ".ogg";
                    else extension = ".bin";

                    String fileName = "SNS_" + timestampStr + "_" + count + extension;
                    incomingFilePaths.add(fileName);

                    byte[] fileBytes = Base64.getDecoder().decode(base64Data);
                    File folder = new File("E:/HManage/hmanage_fe/public/uploaded-media/");
                    if (!folder.exists()) folder.mkdirs();

                    String path = folder.getAbsolutePath() + "/" + fileName;
                    try (FileOutputStream fos = new FileOutputStream(path)) {
                        fos.write(fileBytes);
                    }

                    Document newDoc = new Document();
                    newDoc.setDocumentId(generateId(ModelConstants.DOCUMENT.toString(), timestampStr + count));
                    newDoc.setProjectId(dto.getProjectId());
                    newDoc.setFilePath(fileName);
                    newDoc.setUploadedAt(nowTimestamp);

                    docsToInsert.add(newDoc);
                    count++;

                } catch (Exception e) {
                    e.printStackTrace();
                    throw new RuntimeException("Lỗi khi xử lý media", e);
                }
            }
        }
        if(incomingFilePaths.size() > 0) {
            for (Document doc : currentDocs) {
                if (!incomingFilePaths.contains(doc.getFilePath())) {
                    doc.setProjectId(null);
                    docsToUnlink.add(doc);
                }
            }
        }

        if (!docsToUnlink.isEmpty()) {
            documentRepository.saveAll(docsToUnlink);
        }

        if (!docsToInsert.isEmpty()) {
            documentRepository.saveAll(docsToInsert);
        }

        dto.setProjectId(project.getProjectId());
        return dto;
    }


    public List<QuestionDto> getAllSns() {
        List<Object[]> data = questionRepository.findAllSnsProjects();
        Map<Long, QuestionDto> dtoMap = new LinkedHashMap<>();

        for (Object[] row : data) {
            Project prj = (Project) row[0];
            Document postDoc = (Document) row[1];
            User us = (User) row[2];
            Document userAvatar = (Document) row[3];
            Favourite fvr = (Favourite) row[4];

            Long projectId = prj.getProjectId();
            QuestionDto dto = dtoMap.getOrDefault(projectId, new QuestionDto());

            if (!dtoMap.containsKey(projectId)) {
                dto.setProjectId(projectId);
                dto.setInf02(prj.getInf02());
                dto.setDescription(prj.getDescription());
                dto.setCreatedAt(prj.getCreatedAt());
                dto.setUserId(prj.getUserId());
                dto.setCode(prj.getCode());

                if (us != null) {
                    String fullName = (us.getFirst_name() != null ? us.getFirst_name() : "") +
                            " " +
                            (us.getLast_name() != null ? us.getLast_name() : "");
                    dto.setUserName(fullName.trim());
                }

                if (userAvatar != null) {
                    dto.setAvatar(userAvatar.getFilePath());
                }

                dto.setImages(new ArrayList<>());
                dto.setUserLikeId(new ArrayList<>());
                dto.setO_Comments(new ArrayList<>());
            }

            if (postDoc != null) {
                List<String> images = dto.getImages();
                String filePath = postDoc.getFilePath();
                if (!images.contains(filePath)) {
                    images.add(filePath);
                }
            }

            if (fvr != null) {
                List<String> userLikeId = dto.getUserLikeId();
                String favUserId = String.valueOf(fvr.getUserId());
                if (!userLikeId.contains(favUserId)) {
                    userLikeId.add(favUserId);
                    dto.setCountLike(userLikeId.size());
                }
            }

            dtoMap.put(projectId, dto);
        }

        List<Long> projectIds = new ArrayList<>(dtoMap.keySet());
        List<Object[]> commentData = questionRepository.findCommentsByProjectIds(projectIds);

        for (Object[] row : commentData) {
            Comment cmt = (Comment) row[0];
            User us2 = (User) row[1];
            Long projectId = cmt.getProjectId();

            if (!dtoMap.containsKey(projectId)) continue;
            QuestionDto dto = dtoMap.get(projectId);
            List<CommentDto> commentList = dto.getO_Comments();
            if (commentList == null) commentList = new ArrayList<>();


            CommentDto commentDto = new CommentDto();
            commentDto.setCommentId(cmt.getCommentId());
            commentDto.setText(cmt.getText());
            commentDto.setProjectId(cmt.getProjectId());
            commentDto.setUserId(cmt.getUserId());
            commentDto.setCreatedAt(cmt.getCreatedAt());

            if (us2 != null) {
                String fullName = (us2.getFirst_name() != null ? us2.getFirst_name() : "") +
                        " " +
                        (us2.getLast_name() != null ? us2.getLast_name() : "");
                commentDto.setUserName(fullName.trim());
            }

            commentList.add(commentDto);
            dto.setO_Comments(commentList);
        }

        return new ArrayList<>(dtoMap.values());
    }



    public void like(Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto dto = (UserDto) authentication.getPrincipal();

        LocalDateTime now = LocalDateTime.now();
        String timestampStr = now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));

        Long userId = dto.getUserId();
        List<Favourite> data = questionRepository.findLike(userId, id);

        if (data.isEmpty()) {
            Favourite fvr = new Favourite();
            fvr.setFavouriteId(generateId(ModelConstants.FAVOURITE.toString(), timestampStr));
            fvr.setProjectId(id);
            fvr.setUserId(userId);
            favouriteRepository.save(fvr);
        } else {
            favouriteRepository.delete(data.get(0));
        }

    }

    public CommentDto addComment (CommentDto dto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto dtoUser = (UserDto) authentication.getPrincipal();

        LocalDateTime now = LocalDateTime.now();
        String timestampStr = now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));

        Comment cmt = new Comment();
        cmt.setCommentId(generateId(ModelConstants.COMMENT.toString(), timestampStr));
        cmt.setUserId(dtoUser.getUserId());
        cmt.setProjectId(dto.getProjectId());
        cmt.setText(dto.getText());
        cmt.setCreatedAt(dto.getCreatedAt());
        commentRepository.save(cmt);

        dto.setCommentId(cmt.getCommentId());
        dto.setUserId(cmt.getUserId());

        String fullName = (dtoUser.getFirst_name() != null ? dtoUser.getFirst_name() : "") +
                " " +
                (dtoUser.getLast_name() != null ? dtoUser.getLast_name() : "");
        dto.setUserName(fullName.trim());
        messagingTemplate.convertAndSend("/topic/project/" + dto.getProjectId(), dto);

        return dto;
    }


}
