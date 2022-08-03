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
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.DynamicUpdate;

import com.master.validation.AtributoConfirmacao;

import lombok.Data;

@AtributoConfirmacao(atributo = "password", atributoConfirmacao = "confirmPassword", message = "Senhas diferentes!")
@Entity
@Data
@Table(name = "users")
@DynamicUpdate
public class UserModel implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idUser;

	@NotBlank(message = "Nome é obrigatório!")
	private String name;

	@NotBlank(message = "E-mail é obrigatório!")
	@Email(message = "E-mail inválido!")
	private String email;

	private String password;

	private Boolean active;

	@Size(min = 1, message = "Selecione pelo menos um grupo!")
	@ManyToMany
	@JoinTable(name = "user_groups", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "group_id"))
	private List<GroupModel> groups;

	@Transient
	private String confirmPassword;

	@PreUpdate
	private void preUpdate() {
		this.confirmPassword = password;
	}

	public boolean isNew() {
		return idUser == null;
	}

}
