import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Compra } from '@compra/shared/model/compra';
import { CompraService } from '@compra/shared/service/compra.service';
import { EasyAlerts } from '@core/alerts/sweet-alert';
import { Loading } from '@core/loading/loading';
import { Paquete } from '@paquete/shared/model/paquete';

@Component({
  selector: 'app-crear-compra',
  templateUrl: './crear-compra.component.html',
  styleUrls: ['./crear-compra.component.css'],
})
export class CrearCompraComponent implements OnInit {
  _paquete: Paquete;
  get paquete(): Paquete {
    return this._paquete;
  }
  @Input() set paquete(paquete: Paquete) {
    this._paquete = paquete;
    this.ngOnInit();
  }
  estimacionForm: FormGroup;
  estimando: boolean;
  compraForm: FormGroup;
  minFechaIda = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:00:00');

  constructor(
    protected formBuilder: FormBuilder,
    protected datePipe: DatePipe,
    protected compraService: CompraService,
    protected router: Router
  ) { }

  ngOnInit(): void {
    if (this.paquete) {
      this.estimando = true;
      this.construirEstimacionForm();
    }
  }

  construirEstimacionForm() {
    this.estimacionForm = this.formBuilder.group({
      numeroMenores: [0, [Validators.required, Validators.min(0)]],
      numeroAdultos: [1, [Validators.required, Validators.min(1)]],
      fechaIda: [this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:00:00')],
      fechaRegreso: [this.datePipe.transform(new Date().setDate(new Date().getDate() + (this.paquete.dias - 1)), 'yyyy-MM-ddTHH:00:00')]
    });
    this.estimacionForm.setValidators(this.matchCupos(this.paquete.cupos));

    this.estimacionForm.get('fechaIda').valueChanges.subscribe(valor => {
      const fechaRegreso = new Date(valor);
      fechaRegreso.setDate(fechaRegreso.getDate() + (this.paquete.dias - 1));
      this.estimacionForm.get('fechaRegreso').setValue(this.datePipe.transform(fechaRegreso, 'yyyy-MM-ddTHH:00:00'))
    });
  }

  construirCompraForm(valor: number) {
    this.compraForm = this.formBuilder.group({
      valor: [valor, Validators.required],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  calcularPrecio() {
    if(this.estimacionForm.valid) {
      Loading.state.next(true);
      const compra: Compra = this.compraService.castFechasViaje({...this.estimacionForm.value, idPaquete: this.paquete.id});
      this.compraService.calcularPrecio(compra).subscribe(respuesta => {
        this.construirCompraForm(respuesta.valor);
        this.estimando = false;
        Loading.state.next(false);
      }, error => {
        Loading.state.next(false);
        EasyAlerts.error('Lo sentimos', error.error.mensaje || 'Ocurrió un error, por favor intenta de nuevo');
      });
    } else {
      EasyAlerts.alerta('Oops...', 'Por favor completa bien el formulario');
    }
  }

  comprar() {
    if(this.estimacionForm.valid && this.compraForm.valid) {
      Loading.state.next(true);
      const compra: Compra = this.compraService.castFechasViaje({...this.estimacionForm.value, ...this.compraForm.value, idPaquete: this.paquete.id});
      compra.fechaCompra = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')
      this.compraService.crear(compra).subscribe(respuesta => {
        compra.id = respuesta.valor;
        Loading.state.next(false);
        EasyAlerts.exitoso('Felicidades', '¡El pago de tu paquete fue procesado con éxito!. El siguiente paso es que un asesor se comunicará contigo para explicarte el proceso, ¡Muchas gracias por viajar con nosotros!')
        .then(() => { location.reload();});
      }, () => {
        Loading.state.next(false);
        EasyAlerts.error('Lo sentimos', 'Tuvimos un error procesando tu compra, por favor intenta de nuevo');
      });
    } else {
      EasyAlerts.alerta('Oops...', 'Por favor completa bien el formulario');
    }
  }

  // validaciones

  private matchCupos(cupos: number) : ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const adultos = group.get('numeroAdultos').value;
      const menores = group.get('numeroMenores').value;
      if ((adultos + menores) <= cupos) {
        return null;
      } else {
        return { match_cupos: true }
      }
  };
}

}
