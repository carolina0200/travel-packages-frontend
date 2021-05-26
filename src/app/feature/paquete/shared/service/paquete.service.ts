import { Injectable } from '@angular/core';
import { Respuesta } from '@core/modelo/respuesta';
import { HttpService } from '@core/services/http.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paquete } from '../model/paquete';

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {

  constructor(protected http: HttpService) {}

  public consultar(): Observable<Paquete[]> {
    return this.http.doGet<Paquete[]>(`${environment.endpoint}/paquetes`, this.http.optsName('consultar paquetes'));
  }

  public crear(paquete: Paquete): Observable<Respuesta<number>> {
    return this.http.doPost<Paquete, Respuesta<number>>(`${environment.endpoint}/paquetes`, paquete, this.http.optsName('Crear paquete'));
  }

  public actualizar(paquete: Paquete): Observable<void> {
    return this.http.doPut<Paquete, void>(`${environment.endpoint}/paquetes/${paquete.id}`, paquete, this.http.optsName('Actualizar paquete'));
  }
}
