import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactsComponent } from './contacts/contacts.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactResolver } from './gurads/contact.resolver';

const routes: Routes = [
  { path: '', component: ContactsComponent },
  {
    path: 'new',
    component: ContactFormComponent,
    resolve: { contact: ContactResolver },
  },
  {
    path: 'edit/:id',
    component: ContactFormComponent,
    resolve: { contact: ContactResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsRoutingModule {}
