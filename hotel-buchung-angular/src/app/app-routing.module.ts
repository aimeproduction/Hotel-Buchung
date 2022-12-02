import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListBuchungComponent} from "./components/list-buchung/list-buchung.component";
import {NeueBuchungComponent} from "./components/neue-buchung/neue-buchung.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-buchung',
    pathMatch: 'full'

  },
  {
    path: 'list-buchung',
    component: ListBuchungComponent,
  },
  {
    path: 'neue-buchung',
    component: NeueBuchungComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
