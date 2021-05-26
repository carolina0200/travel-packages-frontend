import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { PaqueteService } from '@paquete/shared/service/paquete.service';
import { of } from 'rxjs';

import { FormularioPaqueteComponent } from './formulario-paquete.component';

describe('FormularioPaqueteComponent', () => {
  let component: FormularioPaqueteComponent;
  let fixture: ComponentFixture<FormularioPaqueteComponent>;
  let paqueteService: PaqueteService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioPaqueteComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [PaqueteService, HttpService, DatePipe]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioPaqueteComponent);
    component = fixture.componentInstance;
    paqueteService = TestBed.inject(PaqueteService);
    spyOn(paqueteService, 'actualizar').and.callFake;
    spyOn(paqueteService, 'crear').and.returnValue(
      of({valor: 1})
    )
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario deberia ser invalido cuando cuando inicia', () => {
    expect(component.paqueteForm.valid).toBeFalsy();
  });

 
});
