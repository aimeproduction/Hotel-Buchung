import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HotelServiceService} from "../../service/hotel-service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Customer} from "../../models/customer";
import {DialogData} from "../../Models/dialogData";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-edit-buchung',
  templateUrl: './edit-buchung.component.html',
  styleUrls: ['./edit-buchung.component.css']
})
export class EditBuchungComponent {

  data_api$!: Observable<Customer>;
  public form!: FormGroup;
  errorObject = ''
  datas: any;
  saveData = true;
  customer_id: number = 0;
  errorDate!: string;
  roomstatus = '';
  errorform=''
  todayDate = new Date();
  latest_date!: any;

  constructor(public dialogRef: MatDialogRef<EditBuchungComponent>, public datepipe: DatePipe,
              // tslint:disable-next-line:max-line-length
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              public service: HotelServiceService,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.idCustomer();
    this.errorObject = '';

    this.data_api$ = this.service.get_customer_data_by_id(this.customer_id).pipe(tap((res: Customer) => {
        return res;
      }),
      catchError(err => {
        this.errorObject = 'Sorry, it was not possible to load the data.';
        return throwError(err);
      })
    );


    this.form = this.fb.group({
      Bookingnumber: ['', Validators.required],
      Gender: ['', Validators.required],
      Roomnumber: ['', Validators.required],
      Firstname: ['', [Validators.required, Validators.minLength(4)]],
      Lastname: ['', Validators.required],
      Email: ['', Validators.required],
      Phonenummer: ['', Validators.required],
      Startdate: ['', Validators.required],
      Enddate: ['', Validators.required]
    });
  }


  idCustomer() {
    this.customer_id = this.data.customer_id;
  }


  update_Data_Booking(form: FormGroup) {
    this.CheckDateValidity(form);
    if (!this.errorform && !this.errorDate) {

      this.service.getAllData().subscribe(data => {
        this.datas = data;
        for (let i = 0; i < data.length; i++) {
          if (form.value.Bookingnumber == data[i].Bookingnumber && form.value.Roomnumber == data[i].Roomnumber
             && form.value.Startdate == data[i].Startdate && form.value.Enddate == data[i].Enddate) {
            this.saveData = true;
            this.errorDate =''
            break;
          }
          else if (form.value.Bookingnumber != data[i].Bookingnumber && form.value.Roomnumber == data[i].Roomnumber) {
            if ((form.value.Startdate >= data[i].Enddate || form.value.Enddate <= data[i].Startdate)||
              (form.value.Startdate < data[i].Startdate && form.value.Enddate <= data[i].Startdate) ||
              (form.value.Startdate >= data[i].Startdate && data[i].Enddate <= form.value.Startdate)) {
              this.errorDate = '';
              this.saveData = true;
            }
            else {
              this.saveData = false;
              this.errorDate = 'Sorry, this room is not free for this period. Please choose another period.'
              break;
            }
          }
        }
        if (this.saveData) {

          this.SendDataToUpdate()
        }
      });
    }

  }

  SendDataToUpdate(){
    this.service.update_customer_data(this.form.value, this.customer_id).subscribe({
      next: () => {
        this._snackBar.open('The data has been successfully modified!', 'Okay', {
          duration: 5000,
          verticalPosition: 'top'
        })
      },
      error: () => {
        alert("Error, failure of the operation")
      },
      complete: () => {
        this.dialogRef.close();
      }
    })
  }
  DateFunction(form: FormGroup) {
    this.latest_date = this.datepipe.transform(this.todayDate, 'yyyy-MM-dd');
  }
  CheckDateValidity(form: FormGroup) {
    this.DateFunction(form);
    if (!form.value.Startdate || !form.value.Enddate) {
      this.errorform = 'Please enter a period';
    } else if (form.value.Startdate < this.latest_date) {
      this.errorform = 'It is not possible to make reservations for past dates'
    } else if (form.value.Startdate == form.value.Enddate) {
      this.errorform = 'Sorry, you have to stay at least one night'
    } else if (form.value.Startdate > form.value.Enddate) {
      this.errorform = 'The start date is further away than the end date. Please change the dates'
    } else {
      this.errorform = '';
    }
  }
}
