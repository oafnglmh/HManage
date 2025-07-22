package com.hmanage.hmanage_be.Controller;

import com.hmanage.hmanage_be.Service.QuestionService;
import com.hmanage.hmanage_be.dto.QuestionDto;
import com.hmanage.hmanage_be.models.Project;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/question/{id}")
    public ResponseEntity<List<QuestionDto>> getById(@PathVariable Long id) {
        List<QuestionDto> questions = questionService.getById(id);
        return ResponseEntity.ok(questions);
    }

    @PostMapping("/question/update")
    public ResponseEntity<QuestionDto> questionUpdate(@RequestBody QuestionDto qs){
        QuestionDto qsDto = questionService.update(qs);
        return ResponseEntity.ok(qsDto);
    }

    @GetMapping("/question/summary/{id}")
    public ResponseEntity<List<QuestionDto>> getQuestionSummary(@PathVariable Long id) {
        List<QuestionDto> questions = questionService.getSummaryById(id);
        return ResponseEntity.ok(questions);
    }

    @PostMapping("/question/start")
    public ResponseEntity<QuestionDto> questionStart(@RequestBody QuestionDto qs){
        QuestionDto qsDto = questionService.add(qs);
        return ResponseEntity.ok(qsDto);
    }

    @GetMapping("/social")
    public ResponseEntity<List<QuestionDto>> getAllSns() {
        List<QuestionDto> questions = questionService.getAllSns();
        return ResponseEntity.ok(questions);
    }

}
