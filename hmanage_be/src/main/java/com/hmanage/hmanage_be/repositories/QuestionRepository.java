package com.hmanage.hmanage_be.repositories;

import com.hmanage.hmanage_be.models.Project;
import com.hmanage.hmanage_be.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Project, Long> {

    @Query("SELECT p, d FROM Project p LEFT JOIN Document d ON p.projectId = d.projectId WHERE p.code LIKE 'QUES-%'")
    List<Object[]> findAllQuestionsWithDocument();

}
