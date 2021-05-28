import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Respuesta } from '@core/modelo/respuesta';
import { HttpService } from '@core/services/http.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Compra } from '../model/compra';

@Injectable()
export class CompraService {

  constructor(protected http: HttpService, protected datePipe: DatePipe) {}

  public consultar(): Observable<Compra[]> {
    return this.http.doGet<Compra[]>(`${environment.endpoint}/compras`, this.http.optsName('consultar compras'));
  }

  public crear(compra: Compra): Observable<Respuesta<number>> {
    return this.http.doPost<Compra, Respuesta<number>>(`${environment.endpoint}/compras`, compra, this.http.optsName('Crear compra'));
  }

  public actualizar(compra: Compra): Observable<void> {
    return this.http.doPut<Compra, void>(`${environment.endpoint}/compras/${compra.id}`, compra, this.http.optsName('Actualizar compra'));
  }

  public eliminar(compra: Compra): Observable<void> {
    return this.http.doRequest<Compra, void>('delete', `${environment.endpoint}/compras/${compra.id}`, compra ,this.http.optsName('Eliminar compra'));
  }

  public calcularPrecio(compra: Compra): Observable<Respuesta<number>> {
    compra = {
      ...compra,
      nombre: 'Calculando precio',
      correo: 'calculado@gmail.com',
      valor: 1,
      fechaCompra: this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')
    }
    return this.http.doPost<Compra, Respuesta<number>>(`${environment.endpoint}/compras/calcular-precio`, compra, this.http.optsName('Calcular precio'));
  }

  public castFechasViaje(compra: Compra): Compra {
      compra.fechaIda = this.datePipe.transform(compra.fechaIda, 'yyyy-MM-dd HH:mm:ss');
      compra.fechaRegreso = this.datePipe.transform(compra.fechaRegreso, 'yyyy-MM-dd HH:mm:ss'); 
      return compra;
  }
}
