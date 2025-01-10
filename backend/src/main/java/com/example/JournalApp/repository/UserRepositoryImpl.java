package com.example.JournalApp.repository;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import com.example.JournalApp.entity.User;


public class UserRepositoryImpl {
 
@Autowired
private MongoTemplate mongoTemplate;


public List<User> getUserForSA() {
    Query query = new Query();
    query.addCriteria(Criteria.where("email").regex("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$", "i"));
    query.addCriteria(Criteria.where("sentimentalAnalysis").is(true));
    List<User> user = mongoTemplate.find(query, User.class);
    return user;
}

}
