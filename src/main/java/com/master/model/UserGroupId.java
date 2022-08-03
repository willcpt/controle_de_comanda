package com.master.model;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Embeddable
public class UserGroupId implements Serializable {

	private static final long serialVersionUID = 1L;
	@ManyToOne
	@JoinColumn(name = "user_id")
	private UserModel userModel;

	@ManyToOne
	@JoinColumn(name = "group_id")
	private GroupModel groupModel;

}
