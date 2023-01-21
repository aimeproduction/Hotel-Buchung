import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBuchungComponent } from './delete-buchung.component';

describe('DeleteBuchungComponent', () => {
  let component: DeleteBuchungComponent;
  let fixture: ComponentFixture<DeleteBuchungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBuchungComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBuchungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
