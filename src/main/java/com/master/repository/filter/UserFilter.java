package com.master.repository.filter;

import java.util.List;

import com.master.model.GroupModel;

import lombok.Data;

@Data
public class UserFilter {

	private String name;
	
	private String email;
	
	private List<GroupModel> groups;

}
