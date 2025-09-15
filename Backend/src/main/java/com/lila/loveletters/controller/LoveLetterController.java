package com.lila.loveletters.controller;
import com.lila.loveletters.model.LoveLetter;
import com.lila.loveletters.service.LoveLetterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/letters")
//@RequiredArgsConstructor
public class LoveLetterController {
    private final LoveLetterService service;

    public LoveLetterController(LoveLetterService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<LoveLetter> create(@RequestBody LoveLetter letter) {
        return ResponseEntity.ok(service.save(letter));
    }

    @GetMapping
    public ResponseEntity<List<LoveLetter>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

}
