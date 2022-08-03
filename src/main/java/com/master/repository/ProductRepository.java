package com.master.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.master.model.ProductModel;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel, Long> {

}
