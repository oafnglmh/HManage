package com.hmanage.hmanage_be.repositories;

import com.hmanage.hmanage_be.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
