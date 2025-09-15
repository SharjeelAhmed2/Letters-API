package com.lila.loveletters.service;
import com.lila.loveletters.model.LoveLetter;
import com.lila.loveletters.repository.LoveLetterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
//@RequiredArgsConstructor
public class LoveLetterService {
    private final LoveLetterRepository repository;

    public LoveLetterService(LoveLetterRepository repository) {
        this.repository = repository;
    }

    public LoveLetter save(LoveLetter letter) {
        letter.setCreatedAt(LocalDateTime.now());
        return repository.save(letter);
    }
}
