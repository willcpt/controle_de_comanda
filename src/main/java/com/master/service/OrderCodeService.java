package com.master.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.master.model.OrderCodeModel;
import com.master.repository.OrderCodeRepository;

@Service
public class OrderCodeService {
	
	@Autowired
	private OrderCodeRepository orderCodeRepository;
	
	public void save(final OrderCodeModel orderCodeModel) {
		orderCodeRepository.save(orderCodeModel);
	}
	
	public Collection<OrderCodeModel> findAll(){
		return orderCodeRepository.findAll();
	}
}
