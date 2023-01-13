import {Component} from '@angular/core';
import {HotelServiceService} from "../../service/hotel-service.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-neue-buchung',
  templateUrl: './neue-buchung.component.html',
  styleUrls: ['./neue-buchung.component.css']
})
export class NeueBuchungComponent {
  booking_first_part = 'Bo'
  booking_last_part = 1;
  public form!: FormGroup;
  errorform ='';
  data: any;
  temp!: number;
  roomNumber: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
  reservedrooms!: number[];
  freerooms!: number[];
  errorDate!: string;
  bookingnumber ='';
  constructor(private route: Router, private fb: FormBuilder, private service: HotelServiceService, private  _snackBar: MatSnackBar) {
  }

  Roomsearch(form: FormGroup){
    if(!form.value.Startdate|| !form.value.Enddate){
      this.errorform ='Please enter a period';
      this.errorDate =''
    }
    else if(form.value.Startdate > form.value.Enddate){

     this.errorDate ='The start date is further away than the end date. Please change the dates';
     this.errorform =''
    }
    else{
      this.errorform =''
      this.errorDate ='';
      this.roomNumber = JSON.parse(<string>localStorage.getItem("roomNumber")) ?? [];
      this.reservedrooms = JSON.parse(<string>localStorage.getItem("reservedrooms")) ?? [];
      this.freerooms = this.roomNumber.filter(x => this.reservedrooms.indexOf(x) === -1);
      this.freerooms.sort((a, b)=> a-b);
      this.service.getAllData().subscribe(data =>{
      this.data = data;
        for(let i =0; i< data.length; i++){
          if((form.value.Startdate >= data[i].Startdate && form.value.Startdate >= data[i].Enddate &&
              form.value.Enddate >= data[i].Startdate && form.value.Enddate >= data[i].Enddate) ||
            (form.value.Startdate <= data[i].Startdate && form.value.Startdate <= data[i].Enddate &&
              form.value.Enddate <= data[i].Startdate && form.value.Enddate <= data[i].Enddate)){
            this.freerooms.push(this.reservedrooms[i]);
            this.freerooms = Array.from(new Set(this.freerooms))
            this.freerooms.sort((a, b)=> a-b);
          }
        }
      });
    }
// this.array_data = JSON.parse(<string>localStorage.getItem('data'));



  }


  onSubmit() {
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
    console.log('number 1 '+this.bookingnumber)
    this.form.value.Roomnumber = (JSON.parse(this.form.value.Roomnumber))
    this.service.post_customer_data(this.form.value).subscribe(res => {
        this.form.reset();
        this._snackBar.open('A student has been successfully added!', 'Okay', {
          duration: 5000,
          verticalPosition: 'top'
        })
      },
      error => {
        alert("Error, failure of the operation");
      })

    })
    this.reservedrooms.push(JSON.parse(this.form.value.Roomnumber))
    localStorage.setItem("reservedrooms", JSON.stringify(this.reservedrooms))
    this.route.navigate(['neue-buchung'])
   /* this.reservedrooms = JSON.parse(<string>localStorage.getItem("reservedrooms")) ?? [];
    this.freerooms = this.roomNumber.filter(x => this.reservedrooms.indexOf(x) === -1);
    this.freerooms.sort((a, b)=> a-b);*/
  }



  ngOnInit(): void {
    this.form = this.fb.group({
      Bookingnumber: [this.bookingnumber],
      Gender: ['', Validators.required],
      Roomnumber: ['', Validators.required],
      Firstname: ['', [Validators.required, Validators.minLength(4)]],
      Lastname: ['', Validators.required],
      Email: ['', Validators.required],
      Phonenummer: ['', Validators.required],
      Startdate: ['', Validators.required],
      Enddate: ['', Validators.required]
    });
    localStorage.setItem("roomNumber", JSON.stringify(this.roomNumber));
    this.reservedrooms =[]
    this.service.getAllData().subscribe(data =>{
      if(data.length ==0){
        this.reservedrooms = [];
        localStorage.setItem("reservedrooms", JSON.stringify(this.reservedrooms))
      }
      else {
        for (let i = 0; i < data.length; i++) {
          this.reservedrooms.push(data[i].Roomnumber)

          localStorage.setItem("reservedrooms", JSON.stringify(this.reservedrooms))
        }
      }


    });

  }


}

