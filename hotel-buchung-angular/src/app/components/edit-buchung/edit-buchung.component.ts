import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HotelServiceService} from "../../service/hotel-service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {Customer} from "../../models/customer";
import {DialogData} from "../../Models/dialogData";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
@Component({
  selector: 'app-edit-buchung',
  templateUrl: './edit-buchung.component.html',
  styleUrls: ['./edit-buchung.component.css']
})
export class EditBuchungComponent {
  student_id = 0;
  data_api$!: Observable<Customer>;
  public form!: FormGroup;
  dataToSend!: Customer;
  student_firstname: string = '';
  student_lastname: string = '';
  date: Date = new Date();
  street: string = '';
  errorObject = ''
  dateoftheday!: Date;
  errorstudent = ''
  datas: any;
  saveData = true;
  temp!: number;
  customer_id: number =0;
  roomNumber: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
  reservedrooms!: number[];
  freerooms!: number[];
  errorDate!: string;
  roomstatus ='';

  constructor(public dialogRef: MatDialogRef<EditBuchungComponent>,
              // tslint:disable-next-line:max-line-length
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              public service: HotelServiceService,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private http: HttpClient, private route: Router) {
  }

  ngOnInit(): void {
    this.idAndMatricule();
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


  idAndMatricule() {
    this.customer_id = this.data.customer_id;
    console.log(this.customer_id)
  }


  update_data_student(form: FormGroup) {

    if(form.value.Startdate > form.value.Enddate){

      this.errorDate ='The start date is further away than the end date. Please change the dates';
    }
    else{
      this.service.getAllData().subscribe(data =>{
        this.datas = data;
        for(let i =0; i< data.length; i++) {
          if (form.value.Roomnumber == data[i].Roomnumber && form.value.Bookingnumber == data[i].Bookingnumber) {
            this.saveData = true;
            this.roomstatus = '';
            break;
          } else if (form.value.Roomnumber == data[i].Roomnumber) {
            if ((form.value.Startdate >= data[i].Startdate && form.value.Startdate >= data[i].Enddate &&
                form.value.Enddate >= data[i].Startdate && form.value.Enddate >= data[i].Enddate) ||
              (form.value.Startdate <= data[i].Startdate && form.value.Startdate <= data[i].Enddate &&
                form.value.Enddate <= data[i].Startdate && form.value.Enddate <= data[i].Enddate)) {
              this.roomstatus = '';
              this.saveData = true;
            }
            else {
              this.saveData = false;
              this.roomstatus = 'Sorry, this room is not free for this period. Please choose another period.'
              break;
            }
          }
        }
        /*  else{
            this.saveData = true;
          }*/

        if (this.saveData) {

          this.service.update_customer_data(this.form.value, this.customer_id).subscribe( {
            next: () => {
              this._snackBar.open('The student has been successfully removed!', 'Okay', {
                duration: 5000,
                verticalPosition: 'top'
              })
            },
              error: () =>{
              alert("Error, failure of the operation")
            },
              complete: () =>{
              this.dialogRef.close();
            }
            })
        }

      });
    }
// this.array_data = JSON.parse(<string>localStorage.getItem('data'));

  }
}
