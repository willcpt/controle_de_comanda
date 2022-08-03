package com.master.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.master.service.OrderCodeService;

@Controller
public class DashboardController {
	
	@Autowired
	private OrderCodeService orderCodeService;
	
	@GetMapping
	@RequestMapping("/dashboard")
	public ModelAndView index() {
		ModelAndView modelAndView = new ModelAndView("pages/home/dashboard");
		modelAndView.addObject("codes", orderCodeService.findAll());
		return modelAndView;
	}
}
