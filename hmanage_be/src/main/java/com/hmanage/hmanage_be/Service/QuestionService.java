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

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final DocumentRepository documentRepository;
    public QuestionDto add(QuestionDto qs) {
        LocalDateTime now = LocalDateTime.now();
        String timestampStr = now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        Timestamp nowTimestamp = Timestamp.valueOf(now);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto dto = (UserDto) authentication.getPrincipal();

        Project prj = new Project();
        prj.setName(qs.getName());
        prj.setDescription(qs.getDescription());
        prj.setMinutes(qs.getMinutes());
        prj.setCode("QUES-" + timestampStr);
        prj.setProjectId(generateId(ModelConstants.PROJECT.toString(), timestampStr));
        prj.setUserId(dto.getUserId());
        prj.setStatus(String.valueOf(StatusConstants.ACTIVE));
        prj.setCreatedAt(nowTimestamp);

        try {
            prj.setInf01(new ObjectMapper().writeValueAsString(qs.getInf01()));
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
}
