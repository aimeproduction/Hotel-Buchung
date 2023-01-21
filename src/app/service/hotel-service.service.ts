import { Injectable } from '@angular/core';
import {map, Observable, tap} from "rxjs";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Customer} from "../models/customer";
import {BnNgIdleService} from "bn-ng-idle";
import {Router} from "@angular/router";
import {DeleteBuchungComponent} from "../components/delete-buchung/delete-buchung.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../components/dialog/dialog.component";

@Injectable({
  providedIn: 'root'
})
export class HotelServiceService {
  firstUser = 'angular1'
  firstPassword = 'project1'
  secondUser = 'angular2'
  secondPassword = 'project2'
  firstUserLogged = false;
  isSomebodyLogged = false;
  reservedrooms!: number[];
  BaseUrl = 'http://localhost:3000/posts';
  constructor(public dialog: MatDialog,private route: Router, private  http: HttpClient, private bnIdle: BnNgIdleService) {

  }
  getAllData(): Observable<Customer[]>{
    return this.http.get<Customer[]>("http://localhost:3000/posts").pipe(tap(res =>{
      console.log(res)
      }

    ));
  }


  get_customer_data_by_id(id: number): Observable<Customer> {
    return this.http.get<Customer>("http://localhost:3000/posts/" + id);
  }


  delete_customer_data(id: number): Observable<Customer> {
    return this.http.delete<Customer>("http://localhost:3000/posts/" + id);
  }

  update_customer_data(data: Customer, id: number): Observable<Customer> {
    return this.http.put<Customer>(`http://localhost:3000/posts/${id}`, data);
  }
  post_customer_data(data: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.BaseUrl, data).pipe(map((res: Customer) => {
      return res;
    }))
  }

  deletebookedroom(index: number): number[] {
    const currentrooms = JSON.parse(<string>localStorage.getItem("reservedrooms")) as number [];
    currentrooms.splice(index, 1);
    localStorage.setItem("reservedrooms", JSON.stringify(currentrooms));
    return currentrooms;
  }
}
