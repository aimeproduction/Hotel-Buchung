import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Customer} from "../../models/customer";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {HotelServiceService} from "../../service/hotel-service.service";
import {DeleteBuchungComponent} from "../delete-buchung/delete-buchung.component";
import {EditBuchungComponent} from "../edit-buchung/edit-buchung.component";
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from "@angular/material/sort";
import { throwError } from 'rxjs';

@Component({
  selector: 'app-list-buchung',
  templateUrl: './list-buchung.component.html',
  styleUrls: ['./list-buchung.component.css']
})
export class ListBuchungComponent{
  displayedColumns: string[] = ["Bookingnumber","Gender",
  "Firstname",
  "Lastname","Email","Phonenummer","Roomnumber","Startdate","Enddate", "Administration"];

  index: number =0;
  customer_id: number = 0;
  data!: Customer[];
  search!: string;
  public form_search!: FormGroup;
  errorObject = '';
  dataSource!: MatTableDataSource<Customer>;
  constructor(private _snackBar: MatSnackBar,
              public dialog: MatDialog, private service: HotelServiceService, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.refresh();
    this.form_search = this.fb.group({
      search: [''],
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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
    this.service.getAllData().subscribe({
    next:(res)=>{
      this.data = res;
      this.dataSource = new MatTableDataSource<Customer>(this.data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
      this.errorObject = '';
    }
    })
    this.errorObject = 'Sorry, it was not possible to load the data. Please try again later.';
  }
}
