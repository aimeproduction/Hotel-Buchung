import { Component } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {Customer} from "../../models/customer";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {HotelServiceService} from "../../service/hotel-service.service";
import {DeleteBuchungComponent} from "../delete-buchung/delete-buchung.component";
import {EditBuchungComponent} from "../edit-buchung/edit-buchung.component";

@Component({
  selector: 'app-list-buchung',
  templateUrl: './list-buchung.component.html',
  styleUrls: ['./list-buchung.component.css']
})
export class ListBuchungComponent {
  index: number =0;
  customer_id: number = 0;
  no_show = true;
  data$!: Observable<Customer[]>;
  search!: string;
  public form_search!: FormGroup;
  test = false;
  errorObject = '';
  dateoftheday = new Date();

  constructor(private _snackBar: MatSnackBar,
              public dialog: MatDialog, private service: HotelServiceService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.refresh();


    this.form_search = this.fb.group({
      search: [''],
    });
  }

  delete_student( id: number, index: number) {
    this.index = index;
    this.customer_id = id;
    this.dialog.open(DeleteBuchungComponent, {
      width: '500px', height: '500px',
      data: {customer_id: this.customer_id, index: this.index}
    }).afterClosed().subscribe(result => {
      this.refresh();
    });
  }


  update_student(index: number) {
    this.customer_id = index;
    this.dialog.open(EditBuchungComponent, {
      width: '700px', height: '650px',
      data: {customer_id: this.customer_id}
    }).afterClosed().subscribe(result => {
      this.refresh();
    });
  }

  refresh() {
    this.errorObject = '';
    this.data$ = this.service.getAllData().pipe(
      catchError(err => {
        this.errorObject = 'Sorry, it was not possible to load the data.';
        return throwError(err);
      })
    );
  }
}
