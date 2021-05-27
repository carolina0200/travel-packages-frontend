import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EasyAlerts } from '@core/alerts/sweet-alert';
import { Loading } from '@core/loading/loading';
import { Paquete } from '@paquete/shared/model/paquete';
import { PaqueteService } from '@paquete/shared/service/paquete.service';

const LONGITUD_MAXIMA_PERMITIDA_TEXTO: number = 100;
const LONGITUD_MAXIMA_PERMITIDA_DESCRIPCION: number = LONGITUD_MAXIMA_PERMITIDA_TEXTO * 2;

@Component({
  selector: 'app-formulario-paquete',
  templateUrl: './formulario-paquete.component.html',
  styleUrls: ['./formulario-paquete.component.css']
})
export class FormularioPaqueteComponent implements OnInit {

  @Input() isNew = true;
  @Input() set paquete(paquete: Paquete) {
    this._paquete = paquete;
    this.ngOnInit();
  }

  @Output() actualizo = new EventEmitter();

  get paquete(): Paquete {
    return this._paquete;
  }
  _paquete: Paquete;
  paqueteForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    protected paqueteService: PaqueteService,
    protected datePipe: DatePipe,
    protected router: Router
  ) { }

  ngOnInit() {
    this.construirFormularioPaquete();
    if(!this.isNew) {
      this.paqueteForm.patchValue(this.paquete);
    }
  }

  guardar() {
    if(this.paqueteForm.valid) {
      this.isNew ? this.crear() : this.editar();
    } else {
      EasyAlerts.alerta('Oops...', 'Por favor completa bien el formulario, te puedes guiar de la letra roja!');
    }
  }

  editar() {
    const paquete: Paquete = {...this.paquete, ...this.paqueteForm.value};
    Loading.state.next(true);   
    this.paqueteService.actualizar(paquete).subscribe(() => {
      Loading.state.next(false);
      EasyAlerts.exitoso('Actualizado con exito');
      this.actualizo.emit({actualizo: true});
    }, err => {
      Loading.state.next(false);
      EasyAlerts.error('Lo sentimos', err.error?.mensaje || 'Ocurrió un error, intenta de nuevo')
      this.actualizo.emit({actualizo: false});
    });
  }

  crear() {
    Loading.state.next(true); 
    this.paqueteService.crear(new Paquete().withFechaCreacion()
    .withPartial(this.paqueteForm.value))
    .subscribe(() => {
      Loading.state.next(false);
      this.router.navigate(['/paquete/listar']);
      EasyAlerts.exitoso('Guardado con exito');
    }, err => {
      Loading.state.next(false);
      EasyAlerts.error('Lo sentimos', err.error?.mensaje || 'Ocurrió un error, intenta de nuevo');
    });
  }

  private construirFormularioPaquete() {
    this.paqueteForm = this.formBuilder.group({
      precio: [0, [Validators.required, Validators.min(0)]],
      ciudad: ['', [Validators.required, Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]],
      hotel: ['', [Validators.required, Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]],
      descripcion: ['', [Validators.required, Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_DESCRIPCION)]],
      cupos: [10, [Validators.required, Validators.min(1)]],
      dias: [3, [Validators.required, Validators.min(1)]],
      estado: ['A', Validators.required],
    });
  }

}
