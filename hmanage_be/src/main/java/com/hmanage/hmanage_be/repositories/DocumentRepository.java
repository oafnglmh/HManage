package com.hmanage.hmanage_be.repositories;

import com.hmanage.hmanage_be.models.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, Long> {
}
