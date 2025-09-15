package com.lila.loveletters.repository;
import com.lila.loveletters.model.LoveLetter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;
public interface LoveLetterRepository extends JpaRepository<LoveLetter, UUID> {
    List<LoveLetter> findByMood(String mood);
}
