import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBuchungComponent } from './list-buchung.component';

describe('ListBuchungComponent', () => {
  let component: ListBuchungComponent;
  let fixture: ComponentFixture<ListBuchungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBuchungComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBuchungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
