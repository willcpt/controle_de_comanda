package com.master.service;

import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.master.model.ProductModel;
import com.master.repository.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;

	public void save(final ProductModel productModel) {

		productRepository.save(productModel);
	}

	public void delete(final ProductModel productModel) {

		productRepository.delete(productModel);
	}

	public void deleteById(final Long idProduto) {

		productRepository.deleteById(idProduto);
	}

	public Optional<ProductModel> findById(final Long idProduct) {

		return productRepository.findById(idProduct);
	}

	public Collection<ProductModel> findAll() {

		return productRepository.findAll();
	}
}
