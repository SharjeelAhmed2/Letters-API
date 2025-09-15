package com.lila.loveletters.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoveLetter {
    @Id
    @GeneratedValue
    private UUID id;

    private String author; // optional

    @Column(length = 1000)
    private String content;

    private String mood; // flirty, comforting, playful, wholesome, etc.

    private LocalDateTime createdAt;

}
