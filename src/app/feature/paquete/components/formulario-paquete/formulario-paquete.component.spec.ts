import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPaqueteComponent } from './formulario-paquete.component';

describe('FormularioPaqueteComponent', () => {
  let component: FormularioPaqueteComponent;
  let fixture: ComponentFixture<FormularioPaqueteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioPaqueteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioPaqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
