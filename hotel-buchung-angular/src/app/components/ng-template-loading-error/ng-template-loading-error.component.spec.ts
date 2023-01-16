import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTemplateLoadingErrorComponent } from './ng-template-loading-error.component';

describe('NgTemplateLoadingErrorComponent', () => {
  let component: NgTemplateLoadingErrorComponent;
  let fixture: ComponentFixture<NgTemplateLoadingErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgTemplateLoadingErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgTemplateLoadingErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
