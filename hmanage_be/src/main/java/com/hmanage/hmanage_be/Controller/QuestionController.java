package com.hmanage.hmanage_be.Controller;

import com.hmanage.hmanage_be.Service.QuestionService;
import com.hmanage.hmanage_be.dto.QuestionDto;
import com.hmanage.hmanage_be.models.Project;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping("/question/add")
    public ResponseEntity<QuestionDto> question(@RequestBody QuestionDto qs){
        QuestionDto qsDto = questionService.add(qs);
        return ResponseEntity.ok(qsDto);
    }

    @GetMapping("/question")
    public ResponseEntity<List<QuestionDto>> getAllQuestions() {
        List<QuestionDto> questions = questionService.getAllQuestions();
        return ResponseEntity.ok(questions);
    }

}
