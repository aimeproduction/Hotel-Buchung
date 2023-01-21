import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {HotelServiceService} from "../../service/hotel-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formular!: UntypedFormGroup;
  errorMessage = '';
  count = 0;
  leavePage = false;

  constructor(private route: Router, private fb: UntypedFormBuilder, private service: HotelServiceService) {

  }

  ngOnInit(): void {
    this.formular = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(user: string, password: string) {
    if (user === this.service.firstUser && password === this.service.firstPassword) {
      this.route.navigate(['home']);
      this.errorMessage = '';
      this.service.firstUserLogged = true;
      this.service.isSomebodyLogged = true;
      this.leavePage = true;
    } else if (user === this.service.secondUser && password === this.service.secondPassword) {
      this.route.navigate(['home']);
      this.errorMessage = '';
      this.service.isSomebodyLogged = true;
      this.service.firstUserLogged = false;
      this.leavePage = true;
    } else {
      this.errorMessage = 'User or password incorrect!'
      this.leavePage = false;
    }
  }
}
