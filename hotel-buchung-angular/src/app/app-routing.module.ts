import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListBuchungComponent} from "./components/list-buchung/list-buchung.component";
import {NeueBuchungComponent} from "./components/neue-buchung/neue-buchung.component";
import {LoginComponent} from "./components/login/login.component";
import {ProtectLoginGuard} from "./components/login/protect-login.guard";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'neue-buchung',
    pathMatch: 'full'

  },
  {
    path: 'neue-buchung',
    component: NeueBuchungComponent,
  },
  {
    path: 'list-buchung',
    component: ListBuchungComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  //  canDeactivate: [ProtectLoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
