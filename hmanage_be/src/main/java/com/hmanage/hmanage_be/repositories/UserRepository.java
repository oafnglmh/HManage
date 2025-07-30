package com.hmanage.hmanage_be.repositories;

import com.hmanage.hmanage_be.models.Friends;
import com.hmanage.hmanage_be.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    @Query("""
    SELECT u, d
    FROM User u 
    LEFT JOIN Document d ON u.userId = d.userId 
    WHERE u.userId = :id
    """)
    List<Object[]> findUserInf(@Param("id") Long id);

    @Query("""
        SELECT p, d1, f
        FROM Project p 
        LEFT JOIN Document d1 ON p.projectId = d1.projectId 
        LEFT JOIN Favourite f ON p.projectId = f.projectId
        WHERE p.userId =    :id AND p.status = '20'
    """)
    List<Object[]> findUserInfPrj(@Param("id") Long id);

    @Query("""
        SELECT u, d
        FROM User u
        LEFT JOIN Document d ON u.userId = d.userId
    """)
    List<Object[]> findAllUser();

    @Query("""
        SELECT f
        FROM Friends f
        WHERE (f.user01 = :id AND f.user02 = :idUser) 
           OR (f.user01 = :idUser AND f.user02 = :id)
    """)
    List<Friends> checkStatusFriend(Long id, Long idUser);

}
