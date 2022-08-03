package com.master.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "item_orders")
public class ItemOrderModel implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idItemOrder;

	private Date date_item;

	private Double quantity;

	private Double price;

	private Double subtotal;

	@ManyToOne
	@JoinColumn(name = "product_id")
	private ProductModel product;

	@ManyToOne
	@JoinColumn(name = "order_id")
	private OrderModel order;

}
