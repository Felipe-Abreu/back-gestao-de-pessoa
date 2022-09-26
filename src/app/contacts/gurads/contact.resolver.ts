import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Contact } from '../model/contact';
import { ContactsService } from '../service/contacts.service';



@Injectable({
  providedIn: 'root'
})
export class ContactResolver implements Resolve<Contact> {

  constructor(private service: ContactsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contact> {
    if (route.params && route.params['id']){
      return this.service.loadById(route.params['id']);
    }
    return of({id: 0, nome: '', telefone: '', email: ''});
  }
}
