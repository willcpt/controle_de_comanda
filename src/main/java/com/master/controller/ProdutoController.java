package com.master.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.master.model.ProductModel;
import com.master.service.ProductService;

@Controller
@RequestMapping("/produtos")
public class ProdutoController {

	@Autowired
	private ProductService productService;
	
	@GetMapping("/new")
	public ModelAndView newProduct(final ProductModel productModel) {
		ModelAndView modelAndView = new ModelAndView("pages/produtos/new_product");
		modelAndView.addObject(productModel);

		return modelAndView;
	}
	
	@PostMapping
	public ModelAndView saveProduct(@Validated final ProductModel productModel) {
		ModelAndView modelAndView = new ModelAndView("pages/produtos/new_product");
		
		productService.save(productModel);

		return modelAndView;
	}
	
	@GetMapping("/edit/{idProduto}")
	public ModelAndView editProduct(@PathVariable("idProduto")final ProductModel productModel) {
		ModelAndView modelAndView = new ModelAndView("pages/produtos/new_product");
		modelAndView.addObject(productModel);

		return modelAndView;
	}
	
	@GetMapping
	public ModelAndView allProducts() {
		ModelAndView modelAndView = new ModelAndView("pages/produtos/list_product");
		modelAndView.addObject("products", productService.findAll());

		return modelAndView;
	}
	
//	@GetMapping("/{idProduto}")
//	public ModelAndView findProduct(@PathVariable("idProduto")final ProductModel productModel) {
//		ModelAndView modelAndView = new ModelAndView("pages/produtos/product");
//		modelAndView.addObject(productModel);
//
//		return modelAndView;
//	}
	
	@DeleteMapping("/{idProduto}")
	public ModelAndView deleteProduct(@PathVariable("idProduto")final ProductModel productModel,
			RedirectAttributes redirectAttributes) {
		productService.delete(productModel);
		redirectAttributes.addFlashAttribute("success", "Produto excluido com sucesso");

		return new ModelAndView("redirect:/produtos");
	}
}
