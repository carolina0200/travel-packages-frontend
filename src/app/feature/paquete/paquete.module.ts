import { NgModule } from '@angular/core';
import { PaqueteRoutingModule } from './paquete-routing.module';
import { SharedModule } from '@shared/shared.module';
import { FormularioPaqueteComponent } from './components/formulario-paquete/formulario-paquete.component';
import { ListarPaqueteComponent } from './components/listar-paquete/listar-paquete.component';
import { PaqueteComponent } from './components/paquete/paquete.component';
import { PaqueteService } from './shared/service/paquete.service';
import { DatePipe } from '@angular/common';
import { CrearCompraModule } from '@compra/components/crear-compra/crear-compra.module';



@NgModule({
  declarations: [
    ListarPaqueteComponent,
    FormularioPaqueteComponent,
    PaqueteComponent
  ],
  imports: [
    PaqueteRoutingModule,
    SharedModule,
    CrearCompraModule
  ],
  exports: [ListarPaqueteComponent],
  providers: [PaqueteService, DatePipe]
})
export class PaqueteModule { }
