import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeueBuchungComponent } from './neue-buchung.component';

describe('NeueBuchungComponent', () => {
  let component: NeueBuchungComponent;
  let fixture: ComponentFixture<NeueBuchungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeueBuchungComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeueBuchungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
