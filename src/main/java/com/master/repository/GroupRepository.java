package com.master.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.master.model.GroupModel;

@Repository
public interface GroupRepository extends JpaRepository<GroupModel, Long> {

}
