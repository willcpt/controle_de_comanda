package com.master.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name="user_groups")
public class UserGroupModel {

	@EmbeddedId
	private UserGroupId id;

}
