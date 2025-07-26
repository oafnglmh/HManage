package com.hmanage.hmanage_be.repositories;

import com.hmanage.hmanage_be.models.Favourite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavouriteReponsitory extends JpaRepository<Favourite, Long> {
}
