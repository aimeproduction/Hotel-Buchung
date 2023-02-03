import {Component, OnInit} from '@angular/core';
import {HotelServiceService} from "../../service/hotel-service.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {DatePipe} from '@angular/common'
import {Customer} from "../../models/customer";


@Component({
  selector: 'app-neue-buchung',
  templateUrl: './neue-buchung.component.html',
  styleUrls: ['./neue-buchung.component.css']
})
export class NeueBuchungComponent implements OnInit {
  showHide = true;
  booking_first_part = 'Bo'
  booking_last_part = 1;
  public form!: FormGroup;
  errorform = '';
  data: any;
  temp!: number;
  roomNumber: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  reservedrooms!: number[];
  freerooms!: number[];
  bookingnumber = '';
  todayDate = new Date();
  latest_date!: any;
  errormail = ''
  startD: any;
  endD: any;
  errormail1 = ''

  constructor(public datepipe: DatePipe, private route: Router, private fb: FormBuilder,
              private service: HotelServiceService, private _snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
    this.service.LogOut();
    this.form = this.fb.group({
      Bookingnumber: [this.bookingnumber],
      Gender: ['', Validators.required],
      Roomnumber: ['', Validators.required],
      Firstname: ['', Validators.required],
      Lastname: ['', Validators.required],
      Email: ['', Validators.required],
      Phonenummer: ['', Validators.required],
      Startdate: ['', Validators.required],
      Enddate: ['', Validators.required]
    });
    this.GetReservedRoomFromLocalstorage();
  }


  GetReservedRoomFromLocalstorage() {
    localStorage.setItem("roomNumber", JSON.stringify(this.roomNumber));
    this.reservedrooms = []
    this.service.getAllData().subscribe(data => {
      if (data.length == 0) {
        this.reservedrooms = [];
        localStorage.setItem("reservedrooms", JSON.stringify(this.reservedrooms))
      } else {
        for (let i = 0; i < data.length; i++) {
          this.reservedrooms.push(data[i].Roomnumber)

          localStorage.setItem("reservedrooms", JSON.stringify(this.reservedrooms))
        }
      }
    });
  }


  DateFunction(form: FormGroup) {
    this.latest_date = this.datepipe.transform(this.todayDate, 'yyyy-MM-dd');
    form.value.Startdate = this.datepipe.transform(form.value.Startdate, 'yyyy-MM-dd')
    form.value.Enddate = this.datepipe.transform(form.value.Enddate, 'yyyy-MM-dd')
  }


  Roomsearch(form: FormGroup) {
    this.DateFunction(form)
    this.CheckDateValidity(form);
    if (!this.errorform) {
      this.showHide = true;
      this.errorform = ''
      this.roomNumber = JSON.parse(<string>localStorage.getItem("roomNumber")) ?? [];
      this.reservedrooms = JSON.parse(<string>localStorage.getItem("reservedrooms")) ?? [];
      this.freerooms = this.roomNumber.filter(x => this.reservedrooms.indexOf(x) === -1);
      this.freerooms.sort((a, b) => a - b);
      this.SearchForFreeRooms(this.form);
    }
  }


  /* Depending on the dates entered by the user we search for the rooms that can be free
   for this period in the array of rooms reserved*/
  SearchForFreeRooms(form: FormGroup) {
    let temp: number[] = [];
    this.service.getAllData().subscribe(data => {
      this.data = data;
      for (let i = 0; i < data.length; i++) {
        form.value.Startdate = this.datepipe.transform(form.value.Startdate, 'yyyy-MM-dd')
        form.value.Enddate = this.datepipe.transform(form.value.Enddate, 'yyyy-MM-dd')
        if ((form.value.Startdate < data[i].Startdate && form.value.Enddate <= data[i].Startdate) ||
          (form.value.Startdate > data[i].Startdate && form.value.Enddate >= data[i].Startdate)) {
          console.log(form.value.Startdate)
          console.log(form.value.Enddate)
          console.log(data[i].Enddate)
          console.log(data[i].Startdate)
          temp.push(this.reservedrooms[i])
        }
      }


      this.CheckFreeRoomAndSort(this.data, this.form, temp);
    });
  }


  /*After searching for potential free rooms and saving them in the temp[],
  we do a final check before adding these rooms among the free rooms.*/
  CheckFreeRoomAndSort(data: Customer[], form: FormGroup, temp: number[]) {
    let temp1: number[] = [];
    let temp2: number[];
    for (let i = 0; i < data.length; i++) {
      if ((form.value.Startdate >= data[i].Startdate && form.value.Startdate < data[i].Enddate) ||
        (form.value.Enddate > data[i].Startdate && form.value.Enddate <= data[i].Enddate)) {
        temp1.push(this.reservedrooms[i])
        console.log('hallo')
      }
    }
    temp2 = temp.filter(x => temp1.indexOf(x) === -1);
    temp2.forEach((item) => {
      this.freerooms.push(item);
    });
    this.freerooms = Array.from(new Set(this.freerooms))
    this.freerooms.sort((a, b) => a - b);
  }


  CheckDateValidity(form: FormGroup) {
    if (!form.value.Startdate || !form.value.Enddate) {
      this.errorform = 'Please enter a period';
      this.showHide = false;
    } else if (form.value.Startdate < this.latest_date) {
      this.errorform = 'It is not possible to make reservations for past dates'
      this.showHide = false;
    } else if (form.value.Startdate == form.value.Enddate) {
      this.errorform = 'Sorry, you have to stay at least one night'
      this.showHide = false;
    } else if (form.value.Startdate > form.value.Enddate) {
      this.errorform = 'The start date is further away than the end date. Please change the dates'
      this.showHide = false;
    } else {
      this.errorform = '';
      this.showHide = true;
    }
  }


  onSubmit() {
    this.CheckFormValidity(this.form)
    this.CheckEmailValidity(this.form)
    if (!this.errorform && !this.errormail && !this.errormail1) {
      this.service.getAllData().subscribe((res) => {
        this.data = res;
        if (this.data.length == 0) {
          this.temp = 0;
          this.bookingnumber = this.booking_first_part + this.booking_last_part + this.temp;
        } else {
          this.temp = this.data[this.data.length - 1].id;
          this.bookingnumber = this.booking_first_part + this.booking_last_part + this.temp;
        }
        this.bookingnumber = this.booking_first_part + this.booking_last_part + this.temp;
        this.form.value.Bookingnumber = this.bookingnumber;
        this.form.value.Roomnumber = (JSON.parse(this.form.value.Roomnumber))
        this.form.value.Startdate = this.datepipe.transform(this.form.value.Startdate, 'yyyy-MM-dd')
        this.form.value.Enddate = this.datepipe.transform(this.form.value.Enddate, 'yyyy-MM-dd')
        this.SendData();
      })
      this.DataToLocalstorage();
    }
  }


  DataToLocalstorage() {
    this.reservedrooms.push(JSON.parse(this.form.value.Roomnumber))
    localStorage.setItem("reservedrooms", JSON.stringify(this.reservedrooms))
  }


  SendData() {
    this.service.post_customer_data(this.form.value).subscribe({
      next: () => {
        this._snackBar.open('The reservation has been successfully completed!', 'Okay', {
          duration: 5000,
          verticalPosition: 'top'
        })
      },
      error: () => {
        alert("Error, failure of the operation")
      },
      complete: () => {
        this.form.reset();
        this.showHide = false;
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    })
  }


  CheckFormValidity(form: FormGroup) {
    if (!form.value.Roomnumber) {
      this.errorform = 'Please choose a room number';
    } else if (!form.value.Gender) {
      this.errorform = 'Please choose a gender'
    } else if (!form.value.Firstname) {
      this.errorform = 'Please enter your first name'
    } else if (!form.value.Lastname) {
      this.errorform = 'Please enter your last name'
    } else if (!form.value.Phonenummer) {
      this.errorform = 'Please enter your phone number'
    } else if (!form.value.Email) {
      this.errorform = 'Please enter your Email address'
    } else {
      this.errorform = '';
    }
  }


  CheckEmailValidity(form: FormGroup) {
    const myList = [',', '/', '!', '§', '$', '%', '&', '{', '(', '[', ')', ']', '=',
      '}', '?', '\\', '<', '>', '|', ';', ':']
    const myList1 = ['@', '.']
    const myString = form.value.Email

    const hasChar = myList.some((charac) => myString.includes(charac));
    const hasChar1 = myList1.some((charac) => myString.includes(charac));
    if (hasChar) {
      this.errormail = 'Your email contains invalid character(s).'
    } else {
      this.errormail = ''
    }
    if (!hasChar1) {
      this.errormail1 = 'Your email muss contains the caracters @ and .'
    } else {
      this.errormail1 = ''
    }
  }

  toogle(event: any) {
    this.showHide = false;
  }

  saveDate(form: FormGroup) {
    this.startD = form.value.Startdate;
    this.endD = form.value.Enddate;
    console.log()
  }
}
