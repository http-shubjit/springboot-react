package com.example.JournalApp.service;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.JournalApp.entity.JournalEntry;
import com.example.JournalApp.entity.User;
import com.example.JournalApp.repository.JournalEntityRepo;

import java.util.List;
import java.util.Optional;

@Service // Indicates that this class is a service component
public class JournalEntryService {

    @Autowired // Field-based dependency injection
    private JournalEntityRepo journalEntityRepo;

    @Autowired
    private UserService userService;

    // Create or update a journal entry
    @Transactional
    public void saveJournalEntry(JournalEntry entry, String username) {
        User user = userService.findByUserName(username);
        JournalEntry savEntry = journalEntityRepo.save(entry);
        user.getJournalEntries().add(savEntry);
        userService.saveUser(user);  
    }

    // Retrieve all journal entries
    public List<JournalEntry> getAllJournalEntries() {
        return journalEntityRepo.findAll();
    }

  public Optional<JournalEntry> findById(ObjectId id) {
        return journalEntityRepo.findById(id);
    }
}