import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Compra } from '@compra/shared/model/compra';
import { CompraService } from '@compra/shared/service/compra.service';
import { Loading } from '@core/loading/loading';
import Swal from 'sweetalert2';

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
    protected compraService: CompraService
  ) { }

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
        Swal.fire({ icon: 'success', title: 'Actualizada',
          text: '¡Compra actualizada con exito!'
        });
        this.actualizo.emit({actualizo: true});
      }, () => {
        Loading.state.next(false);
        Swal.fire({ icon: 'error', title: 'Lo sentimos',
          text: 'Tuvimos un error procesando la compra, por favor intenta de nuevo'
        });
        this.actualizo.emit({actualizo: false});
      });
    } else {
      Swal.fire({ icon: 'warning', title: 'Oops...',
        text: 'Por favor completa bien el formulario'
      });
    }
  }

  confirmarEliminacion() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Eliminar la compra no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo'
    }).then((result) => {
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
      Swal.fire('¡Eliminada!', 'La compra fue eliminada.', 'success')
    }, error => {
      Loading.state.next(false);
      this.actualizo.emit({actualizo: false});
      Swal.fire('Lo sentimos',
        error.error.mensaje || 'Error eliminando la compra, por favor intente de nuevo.',
        'error')
    });
  }

  

}
