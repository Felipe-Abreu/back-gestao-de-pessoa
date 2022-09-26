package com.gestaodepessoa.backgestaodepessoa.services;

import com.gestaodepessoa.backgestaodepessoa.model.Contacts;
import com.gestaodepessoa.backgestaodepessoa.repository.RepositoryContacts;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ContactsService {

    private final RepositoryContacts repositoryContacts;

    public List<Contacts> contactsList() {
        List<Contacts> contacts = repositoryContacts.findAll();
        return contacts;
    }

    public Contacts contactsPost(Contacts contacts) {
        Contacts saveContacts = repositoryContacts.save(contacts);
        return saveContacts;
    }

    public Contacts updateContacts(Contacts contacts) {
        Optional<Contacts> updateContact = repositoryContacts.findById(contacts.getId());
        if (updateContact != null) {
            return repositoryContacts.save(contacts);
        } else {
            return null;
        }
    }

    public void deleteContact(Contacts contacts) {
        if (repositoryContacts.existsById(contacts.getId())) {
            repositoryContacts.deleteById(contacts.getId());
        }
    }

    public Optional<Contacts> getContactId(Contacts contacts) {
        Optional<Contacts> getContactId = repositoryContacts.findById(contacts.getId());
        if (getContactId != null) {
            return getContactId;
        } else {
            return null;
        }
    }
}
