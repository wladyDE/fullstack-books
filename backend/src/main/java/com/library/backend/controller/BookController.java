package com.library.backend.controller;

import com.library.backend.entity.Book;
import com.library.backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/books")
public class BookController {
    @Autowired
    private BookRepository bookRepository;

    @GetMapping()
    public Page<Book> getBooks(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return bookRepository.findAll(pageable);
    }

    @GetMapping("/{id}")
    public Book getBook(@PathVariable("id") Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found"));
    }

    @GetMapping("/search/findByTitleContaining")
    public Page<Book> getBooksByTitleContaining(
            @RequestParam(value = "title") String title,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return bookRepository.findByTitleContaining(title, pageable);
    }

    @GetMapping("/search/findByCategory")
    public Page<Book> getBooksByCategory(
            @RequestParam(value = "category") String category,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return bookRepository.findByCategory(category, pageable);
    }
}

