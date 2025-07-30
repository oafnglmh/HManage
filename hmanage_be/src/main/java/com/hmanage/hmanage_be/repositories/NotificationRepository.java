package com.hmanage.hmanage_be.repositories;

import com.hmanage.hmanage_be.dto.UserDto;
import com.hmanage.hmanage_be.models.Notification;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    @Query("""
        SELECT n, u
        FROM Notification n 
        LEFT JOIN User u ON n.user01 = u.userId 
        WHERE n.user02 = :userId AND n.type != 1000
    """)
    List<Object[]> findAllNotiById(@Param("userId") Long userId, Pageable pageable);
}
