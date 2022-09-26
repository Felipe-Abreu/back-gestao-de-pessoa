import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';
import { Person } from '../model/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private readonly API = 'api/pessoas';

  constructor(private httpClient: HttpClient) {}

  listAll() {
    return this.httpClient.get<Person[]>(this.API).pipe(first(),
    tap(contacts => console.log(contacts)));
  }

  loadById(id: number) {
    return this.httpClient.get<Person>(`${this.API}/${id}`);
  }

  save(record: Partial<Person>) {
    if (record.id) {
      return this.update(record);
    } else
    return this.create(record);
  }

  private create(record: Partial<Person>) {
    return this.httpClient.post<Person>(this.API, record).pipe(first());
  }

  private update(record: Partial<Person>) {
    return this.httpClient.put<Person>(`${this.API}/${record.id}`, record).pipe(first());
  }

  remove(id: number) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
