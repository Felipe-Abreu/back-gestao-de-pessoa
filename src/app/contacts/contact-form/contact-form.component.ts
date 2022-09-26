import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../service/contacts.service';
import { Location } from '@angular/common';
import { Contact } from '../model/contact';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {

  form = this.formBuilder.group({
    id: [0],
    nome: [''],
    telefone: [''],
    email: [''],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: ContactsService,
    private location: Location,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const contact: Contact = this.route.snapshot.data['contact'];
    this.form.setValue({
      id: contact.id,
      nome: contact.nome,
      telefone: contact.telefone,
      email: contact.email
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
