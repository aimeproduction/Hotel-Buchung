import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BnNgIdleService } from 'bn-ng-idle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListBuchungComponent } from './components/list-buchung/list-buchung.component';
import { NeueBuchungComponent } from './components/neue-buchung/neue-buchung.component';
import { EditBuchungComponent } from './components/edit-buchung/edit-buchung.component';
import { DeleteBuchungComponent } from './components/delete-buchung/delete-buchung.component';
import {ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTooltipModule} from "@angular/material/tooltip";
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DatePipe } from '@angular/common';
import { DialogComponent } from './components/dialog/dialog.component'

import {CountdownModule} from "ngx-countdown";
import {NgxPaginationModule} from "ngx-pagination";
import { ChatbotComponent } from './components/chatbot/chatbot.component';
@NgModule({
  declarations: [
    AppComponent,
    ListBuchungComponent,
    NeueBuchungComponent,
    EditBuchungComponent,
    DeleteBuchungComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    DialogComponent,
    ChatbotComponent
  ],
  imports: [
    NgxPaginationModule,
    CountdownModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    HttpClientModule,
    MatSnackBarModule,
    Ng2SearchPipeModule,
    MatDialogModule,
    MatTooltipModule
  ],
  providers: [DatePipe, BnNgIdleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
