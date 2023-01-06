import {EmailValidator, Validators} from "@angular/forms";

export interface Customer {
  Gender: string,
  Roomnumber: number,
  Firstname: string,
  Lastname: string,
  Email: string,
  Phonenummer: string,
  Startdate: Date,
  Enddate: Date
}
