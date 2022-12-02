import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListBuchungComponent } from './components/list-buchung/list-buchung.component';
import { NeueBuchungComponent } from './components/neue-buchung/neue-buchung.component';
import { EditBuchungComponent } from './components/edit-buchung/edit-buchung.component';
import { DeleteBuchungComponent } from './components/delete-buchung/delete-buchung.component';


@NgModule({
  declarations: [
    AppComponent,
    ListBuchungComponent,
    NeueBuchungComponent,
    EditBuchungComponent,
    DeleteBuchungComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
