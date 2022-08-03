package com.master.service;

import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.master.model.OrderModel;
import com.master.repository.OrderRepository;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;

	public void save(final OrderModel orderModel) {

		orderRepository.save(orderModel);
	}

	public void delete(final OrderModel orderModel) {

		orderRepository.delete(orderModel);
	}

	public Optional<OrderModel> deleteById(final Long idOrder) {

		return orderRepository.findById(idOrder);
	}

	public Collection<OrderModel> findAll() {

		return orderRepository.findAll();
	}

}
