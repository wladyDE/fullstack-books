package com.library.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "messages")
@Data
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userEmail;
    private String title;
    private String question;
    private String adminEmail;
    private String response;
    private boolean closed;

    public Message(){}

    public Message(String title, String question) {
        this.title = title;
        this.question = question;
    }
}
