
package com.example.JournalApp.api.response;


import java.util.ArrayList;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WeatherResponse {

    public ArrayList<Weather> weather;
    
    @Getter
    @Setter
    public static class Weather {
        public int id;
        public String main;
        public String description;
        public String icon;
    }

}










