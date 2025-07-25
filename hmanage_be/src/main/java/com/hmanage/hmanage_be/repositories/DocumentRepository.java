package com.hmanage.hmanage_be.repositories;

import com.hmanage.hmanage_be.models.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    Optional<Document> findByFilePath(String filePath);

    @Query("SELECT d FROM Document d WHERE d.projectId = :projectId")
    List<Document> findAllByProjectId(@Param("projectId") Long projectId);

}
