import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { Contact } from '../model/contact';
import { ContactsService } from '../service/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  
  readonly displayedColumns = ['id', 'nome', 'telefone', 'email', 'actions'];

  contatos$: Observable<Contact[]> | null = null;

  constructor(private contactsService: ContactsService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
      this.refresh();
    }

    refresh() {
      this.contatos$ = this.contactsService.listAll()
        .pipe(
          catchError(error => {
            this.onError('Erro ao carregar cursos.');
            return of([])
          })
        );
    }

    onError(errorMsg: string) {
      this.dialog.open(ErrorDialogComponent, {
        data: errorMsg
      });
    }

  ngOnInit(): void {}

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onDelete(element: Contact){
    this.contactsService.remove(element.id).subscribe(
      () => {
        this.refresh();
        this.snackBar.open('Curso removido com sucesso!', 'X', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      },
      () => this.onError('Erro ao tentar remover curso.')
    );
  }

  onEdit(element: Contact){
    this.router.navigate(['edit', element.id], { relativeTo: this.route });
  }
}
