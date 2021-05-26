import { Component, OnInit } from '@angular/core';
import { Compra } from '@compra/shared/model/compra';
import { CompraService } from '@compra/shared/service/compra.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listar-compra',
  templateUrl: './listar-compra.component.html',
  styleUrls: ['./listar-compra.component.css']
})
export class ListarCompraComponent implements OnInit {

  public listaCompras: Observable<Compra[]>;
  compraParaEditar: Compra;

  constructor(protected compraService: CompraService) { }

  ngOnInit(): void {
    this.listaCompras = this.compraService.consultar();
  }

  editar(compra: Compra) {
    this.compraParaEditar = compra;
  }

  actualizo(event) {
    if(event.actualizo) {
      this.ngOnInit();
    }
  }

}
