import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCepComponent } from './find-cep.component';

describe('FindCepComponent', () => {
  let component: FindCepComponent;
  let fixture: ComponentFixture<FindCepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindCepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindCepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
