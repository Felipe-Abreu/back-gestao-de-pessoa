import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonsComponent } from './persons/persons.component';
import { PersonFormComponent } from './person-form/person-form.component';
import { Person } from './model/person';
import { PersonResolver } from './gurads/person.resolver';

const routes: Routes = [
  { path: '', component: PersonsComponent },
  {
    path: 'new',
    component: PersonFormComponent,
    resolve: { person: PersonResolver },
  },
  {
    path: 'edit/:id',
    component: PersonFormComponent,
    resolve: { person: PersonResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonRoutingModule {}
