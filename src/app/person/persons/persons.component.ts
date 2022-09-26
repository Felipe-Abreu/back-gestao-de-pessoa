import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Person } from '../model/person';
import { PersonService } from '../service/person.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

  readonly displayedColumns = ['id', 'nome', 'cpf', 'dataNascimento', 'actions'];

  pessoas$: Observable<Person[]> | null = null;

  constructor(private personService: PersonService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
      this.refresh();
    }

    refresh() {
      this.pessoas$ = this.personService.listAll()
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

  onDelete(person: Person){
    this.personService.remove(person.id).subscribe(
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

  onEdit(person: Person){
    this.router.navigate(['edit', person.id], { relativeTo: this.route });
  }
}
