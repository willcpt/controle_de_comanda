package com.master.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.master.model.OrderCodeModel;

@Repository
public interface OrderCodeRepository extends JpaRepository<OrderCodeModel, Long> {

}
