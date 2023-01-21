import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public form!: FormGroup;

  constructor(private  fb: FormBuilder) {
  }
  SendMail(form: FormGroup){
   console.log(form.value)
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(4)]],
      Email: ['', Validators.required],
      Message: ['', Validators.required],
    });
  }
}
