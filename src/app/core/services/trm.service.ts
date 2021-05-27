import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrmRespuesta } from '@core/modelo/trm-respuesta';
import { HttpService } from '@core/services/http.service';

const DATOS_COLOMBIA_TRM_URL = 'https://www.datos.gov.co/resource/32sa-8pi3.json'

@Injectable({
  providedIn: 'root'
})
export class TrmService {

  constructor(private http: HttpService, private datePipe: DatePipe) { }

  vigenciaHoy(): Promise<TrmRespuesta[]> {
    const params = new HttpParams().set('vigenciadesde', this.datePipe.transform(new Date(), 'yyyy-MM-ddT00:00:00.000'));
    return this.http.doGetParameters<TrmRespuesta[]>(DATOS_COLOMBIA_TRM_URL, params).toPromise();
  }
}
