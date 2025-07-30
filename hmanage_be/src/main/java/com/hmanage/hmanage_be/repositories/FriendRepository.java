package com.hmanage.hmanage_be.repositories;

import com.hmanage.hmanage_be.models.Friends;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendRepository extends JpaRepository<Friends,Long> {
}
