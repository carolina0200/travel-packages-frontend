import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Compra } from '@compra/shared/model/compra';
import { CompraService } from '@compra/shared/service/compra.service';
import { HttpService } from '@core/services/http.service';
import { of } from 'rxjs';
import { EditarCompraComponent } from './editar-compra.component';

describe('EditarCompraComponent', () => {
  let component: EditarCompraComponent;
  let fixture: ComponentFixture<EditarCompraComponent>;
  let compraService: CompraService;
  let spyActualizar: jasmine.Spy;
  let spyEliminar: jasmine.Spy;

  const compraDummy: Compra = {
    id: 1,
    idPaquete: 1,
    valor: 100,
    nombre: 'Carolina Giraldo',
    correo: 'carolina@gmail.com',
    numeroMenores: 1,
    numeroAdultos: 1,
    fechaCompra: '2021-05-03 12:59:00',
    fechaIda: '2021-05-26 12:00:00',
    fechaRegreso: '2021-05-28 12:00:00'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCompraComponent ],
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
    fixture = TestBed.createComponent(EditarCompraComponent);
    component = fixture.componentInstance;
    compraService = TestBed.inject(CompraService);
    spyActualizar = spyOn(compraService, 'actualizar').and.returnValue(of());
    spyEliminar = spyOn(compraService, 'eliminar').and.returnValue(of());
    fixture.detectChanges();
  });

  it('should create', () => {
    component.compra = compraDummy;
    expect(component).toBeTruthy();
  });

  it('El formulario deberia ser valido cuando se crea', () => {
    component.compra = compraDummy;
    expect(component.compraForm.valid).toBeTruthy();
  });

  it('El formulario deberia actualizar', () => {
    component.compra = compraDummy;
    component.actualizar();
    expect(spyActualizar).toHaveBeenCalled();
  });

  it('El formulario deberia elimiar', () => {
    component.compra = compraDummy;
    component.eliminar();
    expect(spyEliminar).toHaveBeenCalled();
  });
});
