import { Injectable } from '@angular/core';
import {map, Observable, tap} from "rxjs";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Customer} from "../models/customer";

@Injectable({
  providedIn: 'root'
})
export class HotelServiceService {
  reservedrooms!: number[];
  BaseUrl = 'http://localhost:3000/posts';
  constructor(private  http: HttpClient) {

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


  delete_customer_data(id: number): Observable<void> {
    console.log("http://localhost:3000/posts/" + id)
    return this.http.delete<void>("http://localhost:3000/posts/" + id);
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
