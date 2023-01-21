import { Injectable } from '@angular/core';
import {map, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Customer} from "../models/customer";
import {BnNgIdleService} from "bn-ng-idle";
import {Router} from "@angular/router";

import {MatDialog} from "@angular/material/dialog";


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
  timer =300;
  constructor(public dialog: MatDialog,private route: Router, private  http: HttpClient, private bnIdle: BnNgIdleService) {

  }

  cancelTimer(){
    this.timer =300;
  }
LogOut(){
  this.bnIdle.startWatching(300).subscribe((res) => {
    if (res) {
      this.route.navigate(['login'])
    }
  });
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
