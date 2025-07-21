package com.hmanage.hmanage_be.repositories;

import com.hmanage.hmanage_be.models.Project;
import com.hmanage.hmanage_be.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Project, Long> {

    @Query("SELECT p, d FROM Project p LEFT JOIN Document d ON p.projectId = d.projectId WHERE p.code LIKE 'QUES-%' AND p.status = '1'")
    List<Object[]> findAllQuestionsWithDocument();
    @Query("SELECT p, d FROM Project p LEFT JOIN Document d ON p.projectId = d.projectId WHERE p.projectId = :id")
    List<Object[]> findProjectWithDocumentsById(@Param("id") Long id);
    @Query("SELECT p, u FROM Project p JOIN User u ON p.userId = u.userId WHERE p.parentId = :id")
    List<Object[]> findProjectWithUserById(Long id);
}
