import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { Paquete } from '@paquete/shared/model/paquete';
import { PaqueteService } from '@paquete/shared/service/paquete.service';
import { of } from 'rxjs';

import { FormularioPaqueteComponent } from './formulario-paquete.component';

describe('FormularioPaqueteComponent', () => {
  let component: FormularioPaqueteComponent;
  let fixture: ComponentFixture<FormularioPaqueteComponent>;
  let paqueteService: PaqueteService;
  let spyActualizar: jasmine.Spy;
  let spyCrear: jasmine.Spy;

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
    spyActualizar = spyOn(paqueteService, 'actualizar').and.returnValue(
      of() // void
    );
    spyCrear = spyOn(paqueteService, 'crear').and.returnValue(
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

  it('Deberia crear un paquete', () => {
    component.nuevo = true;
    const form = {precio: 1000, ciudad: 'Cartagena', hotel: 'Hotel', descripcion: 'una descripcion'};
    component.paqueteForm.patchValue(form);
    component.guardar();
    expect(spyCrear).toHaveBeenCalled();
  });

  
  it('Deberia editar un paquete', () => {
    component.nuevo = false;
    const paqueteDummy = new Paquete();
    paqueteDummy.id = 1;
    paqueteDummy.precio = 10000;
    paqueteDummy.estado = 'A';
    paqueteDummy.ciudad = 'Cartagena';
    paqueteDummy.hotel = 'Decameron';
    paqueteDummy.descripcion = 'Todo Incluido';
    paqueteDummy.cupos = 4;
    paqueteDummy.dias = 3;
    paqueteDummy.fechaCreacion = '2021-05-03 12:00:00';
    component.paquete = paqueteDummy;
    component.guardar();
    expect(spyActualizar).toHaveBeenCalled();
  });
 
});
