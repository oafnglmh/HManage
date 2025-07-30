package com.hmanage.hmanage_be.Controller;

import com.hmanage.hmanage_be.Service.FriendService;
import com.hmanage.hmanage_be.Service.QuestionService;
import com.hmanage.hmanage_be.dto.FriendDto;
import com.hmanage.hmanage_be.dto.QuestionDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class FriendController {
    private final FriendService friendService;

    @PostMapping("/friend/add")
    public ResponseEntity<FriendDto> question(@RequestBody FriendDto fr){
        FriendDto frDto = friendService.add(fr);
        return ResponseEntity.ok(frDto);
    }

}
