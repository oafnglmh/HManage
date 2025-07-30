package com.hmanage.hmanage_be.Service;

import com.hmanage.hmanage_be.Constants.ModelConstants;
import com.hmanage.hmanage_be.Constants.StatusConstants;
import com.hmanage.hmanage_be.Constants.TypeConstants;
import com.hmanage.hmanage_be.dto.NotificationDto;
import com.hmanage.hmanage_be.dto.QuestionDto;
import com.hmanage.hmanage_be.dto.UserDto;
import com.hmanage.hmanage_be.models.Friends;
import com.hmanage.hmanage_be.models.Notification;
import com.hmanage.hmanage_be.models.Project;
import com.hmanage.hmanage_be.models.User;
import com.hmanage.hmanage_be.repositories.FriendRepository;
import com.hmanage.hmanage_be.repositories.NotificationRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final FriendRepository friendRepository;
    public List<NotificationDto> getAll(int page, int size) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto dto = (UserDto) authentication.getPrincipal();

        Pageable pageable = PageRequest.of(page, size);
        List<Object[]> data = notificationRepository.findAllNotiById(dto.getUserId(), pageable);

        List<NotificationDto> listDto = new ArrayList<>();

        for (Object[] row : data) {
            Notification noti = (Notification) row[0];
            User us = (User) row[1];

            NotificationDto notiDto = new NotificationDto();
            notiDto.setNotificationId(noti.getNotificationId());
            notiDto.setStatus(noti.getStatus());
            notiDto.setType(noti.getType());
            notiDto.setUser01(noti.getUser01());
            notiDto.setUser02(noti.getUser02());
            notiDto.setParentId(noti.getParentId());
            String fullName = (us != null)
                    ? ((us.getFirst_name() != null ? us.getFirst_name() : "") + " " +
                    (us.getLast_name() != null ? us.getLast_name() : ""))
                    : "Người dùng không tồn tại";

            notiDto.setNameUserSend(fullName.trim());

            listDto.add(notiDto);
        }

        return listDto;
    }

    public NotificationDto update(NotificationDto dto) {
        Notification noti = notificationRepository.findById(dto.getNotificationId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy với ID: " + dto.getNotificationId()));

        if (dto.getUser01() != null) {
            noti.setUser01(dto.getUser01());
        }
        if (dto.getUser02() != null) {
            noti.setUser02(dto.getUser02());
        }
        if (dto.getStatus() != null) {
            noti.setStatus(dto.getStatus());
        }
        if (dto.getType() != null) {
            noti.setType(dto.getType());
        }
        if (dto.getParentId() != null) {
            noti.setParentId(dto.getParentId());
        }

        notificationRepository.save(noti);

        Friends fr = friendRepository.findById(dto.getParentId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy với ID: " + dto.getParentId()));

        if(dto.getStatus() != null){
            fr.setStatus(dto.getStatus());
        }

        friendRepository.save(fr);

        if (noti.getType() != null && noti.getType() == 1001) {
            Notification newNoti = new Notification();
            LocalDateTime now = LocalDateTime.now();
            String timestampStr = now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));

            newNoti.setNotificationId(generateId(ModelConstants.NOTIFICATION.toString(), timestampStr));
            newNoti.setUser01(noti.getUser02());
            newNoti.setUser02(noti.getUser01());
            newNoti.setStatus(StatusConstants.INACTIVE);
            newNoti.setType(TypeConstants.FRIEND_ACCEPT);
            notificationRepository.save(newNoti);
        }
        return dto;

    }

    private long generateId(String model, String timestampStr) {
        return Long.parseLong(model + timestampStr);
    }
}
