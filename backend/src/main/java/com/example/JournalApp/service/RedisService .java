package com.example.JournalApp.service;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
 class RedisService {

    @Autowired
    private RedisTemplate redisTemplate;
    
    public <T> T get(String key, Class<T> entityClass) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Object o = redisTemplate.opsForValue().get(key);
            if (o == null)
                return null;
            return mapper.readValue(o.toString(), entityClass);
        } 
        catch (Exception e) {
            log.error("Exception",e);
            return null;
        } 
    }

    public void set(String key, Object o,Long ttl) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            String string = mapper.writeValueAsString(o);
           redisTemplate.opsForValue().set(key, string, ttl,TimeUnit.SECONDS);
        } catch (Exception e) {
            log.error("Exception", e);
            
        }
    }
}
