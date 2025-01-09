package com.example.springboot_react.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.springboot_react.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
