import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Respuesta } from '@core/modelo/respuesta';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Compra } from '../model/compra';

import { CompraService } from './compra.service';

describe('CompraService', () => {
  let httpMock: HttpTestingController;
  let service: CompraService;
  const apiEndpointCompras = `${environment.endpoint}/compras`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompraService, HttpService, DatePipe] 
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(CompraService);
  });

  it('should be created', () => {
    const compraService: CompraService = TestBed.inject(CompraService);
    expect(compraService).toBeTruthy();
  });

  it('Debe listar las compras', () => {
    const dummyCompras: Compra[] = [
      new Compra(), new Compra()
    ];
    service.consultar().subscribe(compras => {
      expect(compras.length).toBe(2);
      expect(compras).toEqual(dummyCompras);
    });
    const req = httpMock.expectOne(apiEndpointCompras);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCompras);
  });

  
  it('deberia crear una compra', () => {
    const dummyCompra: Compra = new Compra();
    service.crear(dummyCompra).subscribe((respuesta) => {
      expect(respuesta).toEqual({valor: 1});
    });
    const req = httpMock.expectOne(apiEndpointCompras);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<Respuesta<number>>({body: {valor: 1}}));
  });

  it('deberia actualizar una compra', () => {
    const dummyCompra: Compra = new Compra();
    dummyCompra.id = 1;
    service.actualizar(dummyCompra).subscribe();
    const req = httpMock.expectOne(`${apiEndpointCompras}/${dummyCompra.id}`);
    expect(req.request.method).toBe('PUT');
    req.event(new HttpResponse<void>());
  });

  it('deberia eliminar una compra', () => {
    const dummyCompra: Compra = new Compra();
    dummyCompra.id = 1;
    service.eliminar(dummyCompra).subscribe((respuesta) => {
      expect(respuesta).toBeNull();
    });
    const req = httpMock.expectOne(`${apiEndpointCompras}/${dummyCompra.id}`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<void>());
  });

  
  it('deberia calcular precio de compra', () => {
    const dummyCompra: Compra = new Compra();
    dummyCompra.id = 1;
    service.calcularPrecio(dummyCompra).subscribe((respuesta) => {
      expect(respuesta).toEqual({valor: 100});
    });
    const req = httpMock.expectOne(`${apiEndpointCompras}/calcular-precio`);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<Respuesta<number>>({body: {valor: 100}}));
  });

  it('deberia castear bien las fechas enviadas', () => {
    const dummyCompra: Compra = new Compra();
    dummyCompra.fechaIda = '2021-05-03T12:00';
    dummyCompra.fechaRegreso = '2021-05-29T12:00:59';
    expect(service.castFechasViaje(dummyCompra).fechaIda).toEqual('2021-05-03 12:00:00')
    expect(service.castFechasViaje(dummyCompra).fechaRegreso).toEqual('2021-05-29 12:00:59')
  });


});
