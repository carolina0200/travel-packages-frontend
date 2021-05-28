import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Compra } from '@compra/shared/model/compra';
import { CompraService } from '@compra/shared/service/compra.service';
import { EasyAlerts } from '@core/alerts/sweet-alert';
import { ManejadorError } from '@core/interceptor/manejador-error';
import { Loading } from '@core/loading/loading';

const MILISEGUNDOS_A_DIAS: number = 86400000;

@Component({
  selector: 'app-editar-compra',
  templateUrl: './editar-compra.component.html',
  styleUrls: ['./editar-compra.component.css']
})
export class EditarCompraComponent implements OnInit {

  constructor(
    protected formBuilder: FormBuilder,
    protected datePipe: DatePipe,
    protected compraService: CompraService,
    protected manejadorError: ManejadorError
  ) {}

  compraForm: FormGroup;

  diasDeViaje: number;

  private _compra: Compra
  get compra(): Compra { return this._compra; }
  @Input() set compra(compra: Compra) {
    this._compra = compra;
    this.construirEstimacionForm();
  }

  @Output() actualizo = new EventEmitter();

  ngOnInit(): void {
    this.construirEstimacionForm();
  }

  construirEstimacionForm() {
    if(this.compra) {
      this.diasDeViaje = (new Date(this.compra.fechaRegreso).getTime() - new Date(this.compra.fechaIda).getTime()) / MILISEGUNDOS_A_DIAS;
      this.compraForm = this.formBuilder.group({
        nombre: [this.compra.nombre, [Validators.required]],
        correo: [this.compra.correo, [Validators.required, Validators.email]],
        fechaIda: [this.datePipe.transform(this.compra.fechaIda, 'yyyy-MM-ddTHH:00:00')],
        fechaRegreso: [this.datePipe.transform(this.compra.fechaRegreso, 'yyyy-MM-ddTHH:00:00')]
      })
  
      this.compraForm.get('fechaIda').valueChanges.subscribe(valor => {
        const fechaRegreso = new Date(valor);
        fechaRegreso.setDate(fechaRegreso.getDate() + this.diasDeViaje);
        this.compraForm.get('fechaRegreso').setValue(this.datePipe.transform(fechaRegreso, 'yyyy-MM-ddTHH:00:00'))
      });
    }
  }

  actualizar() {
    if(this.compraForm.valid) {
      Loading.state.next(true);
      const compra: Compra = this.compraService.castFechasViaje({...this.compra, ...this.compraForm.value});
      compra.fechaCompra = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')
      this.compraService.actualizar(compra).subscribe(() => {
        Loading.state.next(false);
        EasyAlerts.exitoso('Actualizada', '¡Compra actualizada con exito!');
        this.actualizo.emit({actualizo: true});
      }, error => {
        this.manejarError(error);
      });
    } else {
      EasyAlerts.alerta('Oops...', 'Por favor completa bien el formulario');
    }
  }

  confirmarEliminacion() {
    EasyAlerts.confirmacion('¿Estás seguro?', '¡Eliminar la compra no se puede revertir!', 'Si, eliminarlo', 'Cancelar')
    .then((result) => {
      if (result.isConfirmed) {
        this.eliminar();
      }
    })
  }

  eliminar() {
    Loading.state.next(true);
    this.compraService.eliminar(this.compra).subscribe(() => {
      Loading.state.next(false);
      this.actualizo.emit({actualizo: true});
      EasyAlerts.exitoso('¡Eliminada!', 'La compra fue eliminada.');
    }, error => {
      this.manejarError(error);
    });
  }

  private manejarError(error: any) {
    Loading.state.next(false);
    this.manejadorError.handleError(error);
    EasyAlerts.error('Lo sentimos', `${this.manejadorError.obtenerErrorHttpCode(error.status)} - ${error.error?.mensaje || 'Por favor intena de nuevo'}`);
    this.actualizo.emit({ actualizo: false });
  }
}
