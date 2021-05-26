import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CompraService } from '@compra/shared/service/compra.service';
import { HttpService } from '@core/services/http.service';
import { Paquete } from '@paquete/shared/model/paquete';
import { of } from 'rxjs';

import { CrearCompraComponent } from './crear-compra.component';

describe('CrearCompraComponent', () => {
  let component: CrearCompraComponent;
  let fixture: ComponentFixture<CrearCompraComponent>;
  let compraService: CompraService;
  let spyCalcularPrecio: jasmine.Spy;
  let spyCrear: jasmine.Spy;
  let paqueteDummy: Paquete;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCompraComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [CompraService, HttpService, DatePipe]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCompraComponent);
    component = fixture.componentInstance;
    compraService = TestBed.inject(CompraService);
    spyCrear = spyOn(compraService, 'crear').and.returnValue(
      of({valor: 1})
    )
    spyCalcularPrecio = spyOn(compraService, 'calcularPrecio').and.returnValue(
      of({valor:10000})
    )
    paqueteDummy = new Paquete();
    paqueteDummy.id = 1;
    paqueteDummy.precio = 10000;
    paqueteDummy.estado = 'A';
    paqueteDummy.ciudad = 'Cartagena';
    paqueteDummy.hotel = 'Decameron';
    paqueteDummy.descripcion = 'Todo Incluido';
    paqueteDummy.cupos = 4;
    paqueteDummy.dias = 3;
    paqueteDummy.fechaCreacion = '2021-05-03 12:00:00';
    fixture.detectChanges();
  });

  it('should create', () => {
    component.paquete = paqueteDummy;
    expect(component).toBeTruthy();
  });

  it('Debe calcular precio', () => {
    component.paquete = paqueteDummy;
    component.calcularPrecio();
    expect(spyCalcularPrecio).toHaveBeenCalled();
  });

  it('Debe crear compra', () => {
    component.paquete = paqueteDummy;
    component.calcularPrecio();
    component.compraForm.patchValue({nombre: 'Carolina Giraldo', correo: 'carolina@gmail.com'})
    component.comprar();
    expect(spyCrear).toHaveBeenCalled();
  });
});
