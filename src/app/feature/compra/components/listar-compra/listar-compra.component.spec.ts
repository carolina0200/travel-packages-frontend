import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Compra } from '@compra/shared/model/compra';
import { CompraService } from '@compra/shared/service/compra.service';
import { HttpService } from '@core/services/http.service';
import { of } from 'rxjs';

import { ListarCompraComponent } from './listar-compra.component';

describe('ListarCompraComponent', () => {
  let component: ListarCompraComponent;
  let fixture: ComponentFixture<ListarCompraComponent>;
  let compraService: CompraService;
  const listaCompras: Compra[] = [new Compra(), new Compra(), new Compra()]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCompraComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [CompraService, HttpService, DatePipe]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCompraComponent);
    component = fixture.componentInstance;
    compraService = TestBed.inject(CompraService);
    spyOn(compraService, 'consultar').and.returnValue(
      of(listaCompras)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.listaCompras.subscribe(respuesta => {
      expect(respuesta?.length).toEqual(3);
    });
  });
});
