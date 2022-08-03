package com.master.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "groups")
public class GroupModel implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idGroup;

	private String name;

	@ManyToMany
	@JoinTable(name = "group_roles", joinColumns = @JoinColumn(name = "group_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private List<RoleModel> roles;

}
