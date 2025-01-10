package com.example.JournalApp.repository;


import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.JournalApp.entity.JournalEntry;


@Repository
public interface JournalEntityRepo extends MongoRepository<JournalEntry,ObjectId> {


    
} 