import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Person } from '../model/person';
import { PersonService } from '../service/person.service';

@Injectable({
  providedIn: 'root',
})
export class PersonResolver implements Resolve<Person> {
  constructor(private service: PersonService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Person> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({ id: 0, nome: '', cpf: '', dataNascimento: '' });
  }
}
