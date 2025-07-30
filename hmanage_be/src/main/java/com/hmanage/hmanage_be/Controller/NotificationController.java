package com.hmanage.hmanage_be.Controller;

import com.hmanage.hmanage_be.Service.NotificationService;
import com.hmanage.hmanage_be.dto.NotificationDto;
import com.hmanage.hmanage_be.dto.QuestionDto;
import com.hmanage.hmanage_be.models.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class NotificationController {
    private final NotificationService notificationService;
    @GetMapping("/notification")
    public ResponseEntity<List<NotificationDto>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(notificationService.getAll(page, size));
    }

    @PostMapping("/notification/update")
    public ResponseEntity<NotificationDto> notiUpdate(@RequestBody NotificationDto notificationDto){
        NotificationDto ntDto = notificationService.update(notificationDto);
        return ResponseEntity.ok(ntDto);
    }
}
