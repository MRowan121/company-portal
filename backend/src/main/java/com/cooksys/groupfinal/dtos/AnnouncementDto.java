package com.cooksys.groupfinal.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@NoArgsConstructor
@Data
public class AnnouncementDto {

    private Long id;

    private Timestamp date;

    private String title;

    private String message;

    private BasicUserDto author;

}
