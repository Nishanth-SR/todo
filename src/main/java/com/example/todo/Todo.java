package com.example.todo;

import jakarta.persistence.*;

@Entity
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private boolean completed;

    // Getters and Setters
    // ✅ Getter for id
    public Long getId() {
        return id;
    }

    // ✅ Setter for id (optional if only backend controls it)
    public void setId(Long id) {
        this.id = id;
    }

    // ✅ Getter and Setter for title
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    // ✅ Getter and Setter for completed
    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
