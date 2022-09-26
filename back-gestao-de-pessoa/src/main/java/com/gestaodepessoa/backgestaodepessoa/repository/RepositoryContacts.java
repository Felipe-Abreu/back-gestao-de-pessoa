package com.gestaodepessoa.backgestaodepessoa.repository;

import com.gestaodepessoa.backgestaodepessoa.model.Contacts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryContacts extends JpaRepository<Contacts, Integer> {
}
