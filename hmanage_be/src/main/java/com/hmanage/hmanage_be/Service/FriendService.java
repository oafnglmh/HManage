package com.hmanage.hmanage_be.Service;

import com.hmanage.hmanage_be.Constants.ModelConstants;
import com.hmanage.hmanage_be.Constants.StatusConstants;
import com.hmanage.hmanage_be.Constants.TypeConstants;
import com.hmanage.hmanage_be.dto.FriendDto;
import com.hmanage.hmanage_be.dto.UserDto;
import com.hmanage.hmanage_be.models.Friends;
import com.hmanage.hmanage_be.models.Notification;
import com.hmanage.hmanage_be.repositories.FriendRepository;
import com.hmanage.hmanage_be.repositories.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
@Service
@RequiredArgsConstructor
public class FriendService {
    private final FriendRepository friendRepository;
    private final NotificationRepository notificationRepository;
    private long generateId(String model, String timestampStr) {
        return Long.parseLong(model + timestampStr);
    }
    public FriendDto add(FriendDto friendDto){
        Integer status = friendDto.getStatus();
        if (status == null) {
            status = StatusConstants.INACTIVE;
            friendDto.setStatus(status);
        }
        LocalDateTime now = LocalDateTime.now();
        String timestampStr = now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto dto = (UserDto) authentication.getPrincipal();

        Friends fr = new Friends();
        Long FriendsId = generateId(ModelConstants.FRIEND.toString(), timestampStr);
        fr.setFriendsId(FriendsId);
        fr.setUser01(dto.getUserId());
        fr.setUser02(friendDto.getUser02());
        fr.setStatus(friendDto.getStatus());
        friendRepository.save(fr);

        Notification notification = new Notification();
        notification.setNotificationId(generateId(ModelConstants.NOTIFICATION.toString(), timestampStr));
        notification.setUser01(dto.getUserId());
        notification.setUser02(friendDto.getUser02());
        notification.setStatus(StatusConstants.INACTIVE);
        notification.setType(TypeConstants.FRIEND_REQUEST);
        notification.setParentId(FriendsId);
        notificationRepository.save(notification);
        return friendDto;
    }
}
