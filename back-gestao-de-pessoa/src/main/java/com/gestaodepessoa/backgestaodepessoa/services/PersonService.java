package com.gestaodepessoa.backgestaodepessoa.services;

import com.gestaodepessoa.backgestaodepessoa.model.Person;
import com.gestaodepessoa.backgestaodepessoa.repository.RepositoryPersons;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PersonService {

    private final RepositoryPersons repositoryPersons;

    public List<Person> personsList() {
        List<Person> persons = repositoryPersons.findAll();
        return persons;
    }

    public Person personsPost(Person person) {
        Person savePersons = repositoryPersons.save(person);
        return savePersons;
    }

    public Person updatePerson(Person person) {
        Optional<Person> updatePerson = repositoryPersons.findById(person.getId());
        if (updatePerson != null) {
            return repositoryPersons.save(person);
        } else {
            return null;
        }
    }

    public void deletePerson(Person person) {
        if (repositoryPersons.existsById(person.getId())) {
            repositoryPersons.deleteById(person.getId());
        }
    }

    public Optional<Person> getPersonId(Person person) {
        Optional<Person> getPersonId = repositoryPersons.findById(person.getId());
        if (getPersonId != null) {
            return getPersonId;
        } else {
            return null;
        }
    }
}
