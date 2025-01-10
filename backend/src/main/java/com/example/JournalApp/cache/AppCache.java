package com.example.JournalApp.cache;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.JournalApp.entity.ConfigJournalAppEntity;
import com.example.JournalApp.repository.ConfigJournalAppRepository;





@Component
public class AppCache {
   
  @Autowired
    private ConfigJournalAppRepository configJournalAppRepository;

    public Map<String, String> API_CACHE;


     @javax.annotation.PostConstruct
    public void init(){
        API_CACHE = new HashMap<>();
        List<ConfigJournalAppEntity> all = configJournalAppRepository.findAll();
        for (ConfigJournalAppEntity configJournalAppEntity : all) {
            API_CACHE.put(configJournalAppEntity.getKey(), configJournalAppEntity.getValue());
        }
    }
    
}
