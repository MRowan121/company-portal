package com.cooksys.groupfinal.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Data
public class Announcement {

    @Id
    @GeneratedValue
    private Long id;

    @CreatedDate
    private Timestamp date = Timestamp.valueOf(LocalDateTime.now());

    private String title;

    private String message;

    @ManyToOne
    private Company company;

    @ManyToOne
    private User author;

}
