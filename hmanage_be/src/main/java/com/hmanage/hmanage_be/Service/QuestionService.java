package com.hmanage.hmanage_be.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hmanage.hmanage_be.Constants.ModelConstants;
import com.hmanage.hmanage_be.Constants.StatusConstants;
import com.hmanage.hmanage_be.dto.QuestionDto;
import com.hmanage.hmanage_be.dto.QuestionItemDto;
import com.hmanage.hmanage_be.dto.SignUpDto;
import com.hmanage.hmanage_be.dto.UserDto;
import com.hmanage.hmanage_be.models.Document;
import com.hmanage.hmanage_be.models.Project;
import com.hmanage.hmanage_be.models.User;
import com.hmanage.hmanage_be.repositories.DocumentRepository;
import com.hmanage.hmanage_be.repositories.QuestionRepository;
import com.hmanage.hmanage_be.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
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
                    doc.setFilePath(fileName); // ✅ Lưu lại fileName để FE dùng
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
            System.out.println("Dòng lấy ra:");
            System.out.println("ProjectId: " + prj.getProjectId());
            System.out.println("DocumentId: " + (doc != null ? doc.getDocumentId() : "null"));
            System.out.println("Code: " + prj.getCode());
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
        Optional<Project> optionalProject = questionRepository.findById(dto.getProjectId());
        if (!optionalProject.isPresent()) {
            throw new RuntimeException("Không tìm thấy Project với ID: " + dto.getProjectId());
        }

        Project project = optionalProject.get();

        project.setName(dto.getName());
        project.setDescription(dto.getDescription());
        project.setMinutes(dto.getMinutes());
        project.setStatus(dto.getStatus());
        project.setCode(dto.getCode());
        project.setUserId(dto.getUserId());
        project.setCreatedAt(dto.getCreatedAt());

        try {
            ObjectMapper mapper = new ObjectMapper();
            String jsonInf01 = mapper.writeValueAsString(dto.getInf01());
            project.setInf01(jsonInf01);
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi convert inf01 thành JSON", e);
        }

        project = questionRepository.save(project);

        dto.setProjectId(project.getProjectId());
        return dto;
    }

    public List<QuestionDto> getAllSns() {
        List<Object[]> data = questionRepository.findAllSnsWithDocumentsAndUserAvatars();
        Map<Long, QuestionDto> dtoMap = new LinkedHashMap<>(); // preserve order

        for (Object[] row : data) {
            Project prj = (Project) row[0];
            Document postDoc = (Document) row[1];
            User us = (User) row[2];
            Document userAvatar = (Document) row[3];

            Long projectId = prj.getProjectId();

            QuestionDto dto = dtoMap.getOrDefault(projectId, new QuestionDto());
            dto.setProjectId(projectId);
            dto.setInf02(prj.getInf02());
            dto.setDescription(prj.getDescription());
            dto.setCreatedAt(prj.getCreatedAt());
            dto.setUserId(prj.getUserId());

            if (us != null) {
                String fullName = (us.getFirst_name() != null ? us.getFirst_name() : "") +
                        " " +
                        (us.getLast_name() != null ? us.getLast_name() : "");
                dto.setUserName(fullName.trim());
            }

            if (userAvatar != null) {
                dto.setAvatar(userAvatar.getFilePath());
            }

            if (postDoc != null) {
                List<String> images = dto.getImages();
                if (images == null) images = new ArrayList<>();
                images.add(postDoc.getFilePath());
                dto.setImages(images);
            }

            dtoMap.put(projectId, dto);
        }

        return new ArrayList<>(dtoMap.values());
    }

}
