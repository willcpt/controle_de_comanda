package com.master.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.master.model.OrderModel;

@Repository
public interface OrderRepository extends JpaRepository<OrderModel, Long> {

}
