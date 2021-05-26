import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Respuesta } from '@core/modelo/respuesta';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Paquete } from '../model/paquete';

import { PaqueteService } from './paquete.service';

describe('PaqueteService', () => {
  let httpMock: HttpTestingController;
  let service: PaqueteService;
  const apiEndpointPaquetes = `${environment.endpoint}/paquetes`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaqueteService, HttpService] 
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(PaqueteService);
  });

  it('should be created', () => {
    const paqueteService: PaqueteService = TestBed.inject(PaqueteService);
    expect(paqueteService).toBeTruthy();
  });

  it('Debe listar los paquetes', () => {
    const dummyPaquetes: Paquete[] = [
      new Paquete(), new Paquete()
    ];
    service.consultar().subscribe(paquetes => {
      expect(paquetes.length).toBe(2);
      expect(paquetes).toEqual(dummyPaquetes);
    });
    const req = httpMock.expectOne(apiEndpointPaquetes);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPaquetes);
  });

  it('deberia crear un paquete', () => {
    const dummyPaquete: Paquete = new Paquete();
    service.crear(dummyPaquete).subscribe((respuesta) => {
      expect(respuesta).toEqual({valor: 1});
    });
    const req = httpMock.expectOne(apiEndpointPaquetes);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<Respuesta<number>>({body: {valor: 1}}));
  });

  it('deberia actualizar un paquete', () => {
    const dummyPaquete: Paquete = new Paquete();
    dummyPaquete.id = 1;
    service.actualizar(dummyPaquete).subscribe();
    const req = httpMock.expectOne(`${apiEndpointPaquetes}/${dummyPaquete.id}`);
    expect(req.request.method).toBe('PUT');
    req.event(new HttpResponse<void>());
  });
});
