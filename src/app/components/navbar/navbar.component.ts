import { Component } from '@angular/core';
import {HotelServiceService} from "../../service/hotel-service.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  timer!: number;
  constructor(private service: HotelServiceService) {
  }

  ngOnInit(): void{
    this.timer = this.service.timer;
  }
  handleEvent(event: any){
    window.addEventListener("mousemove", ()=>this.service.cancelTimer())
  }
}
