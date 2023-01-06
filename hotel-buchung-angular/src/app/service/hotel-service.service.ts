import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Customer} from "../models/customer";

@Injectable({
  providedIn: 'root'
})
export class HotelServiceService {
  BaseUrl = 'http://localhost:3000/posts';
  constructor(private  http: HttpClient) {

  }
  getAllData(): Observable<any>{
    return this.http.get<any>("http://localhost:3000/posts");
  }

  post_customer_data(data: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.BaseUrl, data).pipe(map((res: Customer) => {
      return res;
    }))
  }
}
