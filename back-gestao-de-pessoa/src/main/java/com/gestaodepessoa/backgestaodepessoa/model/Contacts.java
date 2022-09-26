package com.gestaodepessoa.backgestaodepessoa.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;

@Entity
@Data
public class Contacts {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String nome;
    private String telefone;
    @Email
    private String email;

    @ManyToOne
    @JoinColumn(name = "person_id")
    private Person person;

}
