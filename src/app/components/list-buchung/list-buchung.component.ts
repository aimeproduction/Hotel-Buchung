import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Customer} from "../../models/customer";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {HotelServiceService} from "../../service/hotel-service.service";
import {DeleteBuchungComponent} from "../delete-buchung/delete-buchung.component";
import {EditBuchungComponent} from "../edit-buchung/edit-buchung.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-list-buchung',
  templateUrl: './list-buchung.component.html',
  styleUrls: ['./list-buchung.component.css']
})
export class ListBuchungComponent implements OnInit {
  title = 'pagination'
  index: number = 0;
  customer_id: number = 0;
  data!: Customer[];
  search!: string;
  public form_search!: FormGroup;
  errorObject = '';
  displayedColumns: string[] = ["Bookingnumber", "Gender", "Firstname",
    "Lastname", "Email", "Phonenummer", "Roomnumber", "Startdate", "Enddate", "Administration"];
  forThePagination = true;
  Dataavailable = false
  dataSource!: MatTableDataSource<Customer>;

  constructor(private _snackBar: MatSnackBar,
              public dialog: MatDialog, private service: HotelServiceService, private fb: FormBuilder) {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.service.LogOut();
    this.refresh();
    this.form_search = this.fb.group({
      search: [''],
    });
    this.refresh()
  }


  delete_Booking(id: number, index: number) {
    this.index = index;
    this.customer_id = id;
    this.dialog.open(DeleteBuchungComponent, {
      width: '500px', height: '500px',
      data: {customer_id: this.customer_id, index: this.index}
    }).afterClosed().subscribe(result => {
      this.refresh();
    });
  }

  update_Booking(index: number) {
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
    this.service.getAllData().subscribe({
      next: (res) => {
        this.data = res;
        this.dataSource = new MatTableDataSource<Customer>(this.data)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
        this.errorObject = '';
        if (this.data.length == 0) {
          this.forThePagination = false;
          this.Dataavailable = true;
        }
      },
      error: () => {
        this.errorObject = 'Sorry, it was not possible to load the data.';
      }
    });

  }

}
