import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../Models/dialogData";
import {HotelServiceService} from "../../service/hotel-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable, throwError} from "rxjs";
import {Customer} from "../../models/customer";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-delete-buchung',
  templateUrl: './delete-buchung.component.html',
  styleUrls: ['./delete-buchung.component.css']
})
export class DeleteBuchungComponent {
  index: number = 0;
  customer_id = 0;
  data_api$!: Observable<Customer>;

  errorObject = ''

  constructor(public dialogRef: MatDialogRef<DeleteBuchungComponent>,
              // tslint:disable-next-line:max-line-length
              @Inject(MAT_DIALOG_DATA) public data: DialogData, private service: HotelServiceService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.idAndIndex();
    this.errorObject = ''
    this.data_api$ = this.service.get_customer_data_by_id(this.customer_id).pipe(
      catchError(err => {
        this.errorObject = 'Sorry, it was not possible to load the data.';
        return throwError(err);
      })
    );
  }


  idAndIndex() {
    this.customer_id = this.data.customer_id;
    this.index = this.data.index;
    console.log(this.customer_id)
    console.log(this.index)
  }

  ClickClose(): void {
    this.dialogRef.close();
  }

  delete_student() {
    this.service.delete_customer_data(this.customer_id).subscribe({
      next: () => {
        this._snackBar.open('The booking has been successfully deleted!', 'Okay', {
          duration: 5000,
          verticalPosition: 'top'
        })
      },
      error: () => {
        alert("Error, failure of the operation")
      },
      complete: () => {
        this.ClickClose()
      }

    })
  }

  deletebookedroom() {
    this.service.deletebookedroom(this.index)
  }
}
