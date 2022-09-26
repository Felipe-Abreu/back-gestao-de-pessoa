import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { PersonService } from '../service/person.service';
import { Person } from '../model/person';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {

  form = this.formBuilder.group({
    id: [0],
    nome: [''],
    cpf: [''],
    dataNascimento: [''],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: PersonService,
    private location: Location,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const person: Person = this.route.snapshot.data['person'];
    this.form.setValue({
      id: person.id,
      nome: person.nome,
      cpf: person.cpf,
      dataNascimento: person.dataNascimento
    })
  }

  onCancel() {
    this.location.back();
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(
      (response) => console.log(response),
      (error) => this.onError
    );
  }

  private onError() {
    this.snackBar.open('Erro ao salvar', '', { duration: 7000 });
  }

  private onSuccess() {
    this.snackBar.open('Curso salvo com sucesso!', '', { duration: 5000 });
    this.onCancel();
  }

}