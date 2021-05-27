import { Component, OnInit } from '@angular/core';
import { TrmRespuesta } from '@core/modelo/trm-respuesta';
import { TrmService } from '@core/services/trm.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {

  constructor(private trmService: TrmService) { }

  trmData: TrmRespuesta;

  ngOnInit() {
    this.obtenerTrm();
  }

  async obtenerTrm() {
    this.trmData = undefined;
    this.trmData = (await this.trmService.vigenciaHoy())[0];
  }

}
