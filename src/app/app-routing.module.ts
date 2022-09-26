import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo:'persons'},
  {
    path: 'pessoas',
    loadChildren: () => import('./person/person.module').then(m => m.PersonModule)
  },
  {path: '', pathMatch: 'full', redirectTo:'contacts'},
  {
    path: 'contatos',
    loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
