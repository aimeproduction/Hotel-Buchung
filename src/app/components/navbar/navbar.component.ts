import {Component, HostListener, ViewChild} from '@angular/core';
import {HotelServiceService} from "../../service/hotel-service.service";
import {CountdownComponent} from "ngx-countdown";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('cd', { static: false }) private countdown!: CountdownComponent;

  timer!: number;
  constructor(private service: HotelServiceService) {
  }

  ngOnInit(): void{
    this.timer = this.service.timer;
    this.service.LogOut();
  }
@HostListener('window:mousemove')
OnMouseMove(){
  this.countdown.restart();
}

}
