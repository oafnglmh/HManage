package com.hmanage.hmanage_be.repositories;

import com.hmanage.hmanage_be.models.Favourite;
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

    @Query("""
        SELECT p, d1, u, d2, f
        FROM Project p 
        LEFT JOIN Document d1 ON p.projectId = d1.projectId 
        LEFT JOIN User u ON p.userId = u.userId 
        LEFT JOIN Document d2 ON u.userId = d2.userId 
        LEFT JOIN Favourite f ON p.projectId = f.projectId
        WHERE p.code LIKE 'SNS-%' AND p.status = '20'
    """)
    List<Object[]> findAllSnsProjects();

    @Query("""
        SELECT c, u 
        FROM Comment c 
        LEFT JOIN User u ON c.userId = u.userId 
        WHERE c.projectId IN :projectIds
    """)
    List<Object[]> findCommentsByProjectIds(@Param("projectIds") List<Long> projectIds);


    @Query("SELECT l FROM Favourite l WHERE l.userId = :userId AND l.projectId = :projectId")
    List<Favourite> findLike(@Param("userId") Long userId, @Param("projectId") Long projectId);


}
