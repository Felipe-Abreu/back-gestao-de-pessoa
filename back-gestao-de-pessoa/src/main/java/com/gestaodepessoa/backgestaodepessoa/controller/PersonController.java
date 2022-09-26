package com.gestaodepessoa.backgestaodepessoa.controller;

import com.gestaodepessoa.backgestaodepessoa.model.Person;
import com.gestaodepessoa.backgestaodepessoa.services.PersonService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("api")
@AllArgsConstructor
public class PersonController {

    private final PersonService personService;

    @GetMapping("pessoas")
    public List<Person> listPerson() {
        return personService.personsList();
    }

    @GetMapping(value = "pessoas/{id}")
    public Optional<Person> listPersonId(@PathVariable("id") Person person) {
        return personService.getPersonId(person);
    }

    @PostMapping(value = "pessoas", consumes = APPLICATION_JSON_VALUE)
    public Person createPerson(@RequestBody @Valid Person person) {
        return personService.personsPost(person);
    }

    @PutMapping(value = "pessoas/{id}", consumes = APPLICATION_JSON_VALUE)
    public Person upPerson(@RequestBody @Valid Person person) {
        personService.updatePerson(person);
        return person;
    }

    @DeleteMapping("pessoas/{id}")
    public void delPerson(@PathVariable("id") Person person) {
        personService.deletePerson(person);
    }
}
