package com.example.JournalApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class EmailService {
    
    // @Autowired
    // private JavaMailSender javaMailSender;


     public void sendSimpleMessage(String to, String subject, String text) {
      try {
          SimpleMailMessage message = new SimpleMailMessage();
          message.setTo(to);
          message.setSubject(subject);
          message.setText(text);
          System.out.println(text);
        //   javaMailSender.send(message);
      } catch (Exception e) {
          log.error("Exception while sendEmail ", e);      }
       
    }
    
}
