import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { Paquete } from '@paquete/shared/model/paquete';
import { PaqueteService } from '@paquete/shared/service/paquete.service';
import { SharedModule } from '@shared/shared.module';
import { of } from 'rxjs';

import { ListarPaqueteComponent } from './listar-paquete.component';

describe('ListarPaqueteComponent', () => {
  let component: ListarPaqueteComponent;
  let fixture: ComponentFixture<ListarPaqueteComponent>;
  let paqueteService: PaqueteService;
  const listaPaquetes: Paquete[] = [new Paquete(), new Paquete()]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPaqueteComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        SharedModule
      ],
      providers: [PaqueteService, HttpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPaqueteComponent);
    component = fixture.componentInstance;
    paqueteService = TestBed.inject(PaqueteService);
    spyOn(paqueteService, 'consultar').and.returnValue(
      of(listaPaquetes)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.listaPaquetes.subscribe(respuesta => {
      expect(respuesta?.length).toEqual(2);
    });
  });

  it('Si admin filtro deberia estar vacío, y A si no es admin', () => {
    component.admin = true;
    expect(component.filtro).toEqual('');

    component.admin = false;
    expect(component.filtro).toEqual('A');
  });
});
