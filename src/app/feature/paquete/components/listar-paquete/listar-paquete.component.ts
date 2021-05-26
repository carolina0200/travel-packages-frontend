import { Component, Input, OnInit } from '@angular/core';
import { Paquete } from '@paquete/shared/model/paquete';
import { PaqueteService } from '@paquete/shared/service/paquete.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-listar-paquete',
  templateUrl: './listar-paquete.component.html',
  styleUrls: ['./listar-paquete.component.css']
})
export class ListarPaqueteComponent implements OnInit {

  _admin: boolean = true;
  get admin(): boolean {
    return this._admin;
  }
  @Input() set admin(admin: boolean) {
    this._admin = admin;
    this.filtro = this._admin ? '' : 'A';
  };
  paqueteParaCompartir: Paquete;
  public listaPaquetes: Observable<Paquete[]>;
  filtro: string ='';

  constructor(protected paqueteService: PaqueteService) { }

  ngOnInit(): void {
    this.listaPaquetes = this.paqueteService.consultar();
  }

  compartir(paquete: Paquete) {
    this.paqueteParaCompartir = paquete;
  }

  actualizo(event) {
    if(event.actualizo) {
      this.ngOnInit();
    }
  }

}
