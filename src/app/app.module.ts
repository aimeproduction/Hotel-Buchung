import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import {MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule} from "@angular/material/core";
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
import { DatePipe } from '@angular/common';
import { DialogComponent } from './components/dialog/dialog.component'
import {CountdownModule} from "ngx-countdown";
import {NgxPaginationModule} from "ngx-pagination";
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
@NgModule({
  declarations: [
    AppComponent,
    ListBuchungComponent,
    NeueBuchungComponent,
    EditBuchungComponent,
    DeleteBuchungComponent,
    LoginComponent,
    NavbarComponent,
    DialogComponent,
    ChatbotComponent
  ],
    imports: [
        FormsModule,
      MatFormFieldModule,
      MatNativeDateModule,
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
        MatTooltipModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatDatepickerModule
    ],
  providers: [DatePipe, BnNgIdleService, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
