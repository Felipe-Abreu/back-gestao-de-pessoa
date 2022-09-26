package com.gestaodepessoa.backgestaodepessoa.controller;

import com.gestaodepessoa.backgestaodepessoa.model.Contacts;
import com.gestaodepessoa.backgestaodepessoa.services.ContactsService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("api")
@AllArgsConstructor
public class ContactController {

    private final ContactsService contactsService;

    @GetMapping("contatos")
    public @ResponseBody List<Contacts> listContact() {
        return contactsService.contactsList();
    }

    @GetMapping(value = "contatos/{id}")
    public Optional<Contacts> listContactId(@PathVariable("id") Contacts contacts) {
        return contactsService.getContactId(contacts);
    }

    @PostMapping(value = "contatos", consumes = APPLICATION_JSON_VALUE)
    public Contacts createContact(@RequestBody @Valid Contacts contacts) {
        return contactsService.contactsPost(contacts);
    }

    @PutMapping(value = "contatos/{id}", consumes = APPLICATION_JSON_VALUE)
    public Contacts upContact(@RequestBody @Valid Contacts contacts) {
        contactsService.updateContacts(contacts);
        return contacts;
    }

    @DeleteMapping("contatos/{id}")
    public void delContact(@PathVariable("id") Contacts contacts) {
        contactsService.deleteContact(contacts);
    }
}
