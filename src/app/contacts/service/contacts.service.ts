import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';

import { Contact } from '../model/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private readonly API = 'api/contatos';

  constructor(private httpClient: HttpClient) {}

  listAll() {
    return this.httpClient.get<Contact[]>(this.API).pipe(first(),
    tap(contacts => console.log(contacts)));
  }

  loadById(id: number) {
    return this.httpClient.get<Contact>(`${this.API}/${id}`);
  }

  save(record: Partial<Contact>) {
    if (record.id) {
      return this.update(record);
    } else
    return this.create(record);
  }

  private create(record: Partial<Contact>) {
    return this.httpClient.post<Contact>(this.API, record).pipe(first());
  }

  private update(record: Partial<Contact>) {
    return this.httpClient.put<Contact>(`${this.API}/${record.id}`, record).pipe(first());
  }

  remove(id: number) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
