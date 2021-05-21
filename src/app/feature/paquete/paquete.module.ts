import { NgModule } from '@angular/core';
import { PaqueteRoutingModule } from './paquete-routing.module';
import { SharedModule } from '@shared/shared.module';
import { FormularioPaqueteComponent } from './components/formulario-paquete/formulario-paquete.component';
import { ListarPaqueteComponent } from './components/listar-paquete/listar-paquete.component';
import { PaqueteComponent } from './components/paquete/paquete.component';
import { PaqueteService } from './shared/service/paquete.service';



@NgModule({
  declarations: [
    FormularioPaqueteComponent,
    ListarPaqueteComponent,
    PaqueteComponent
  ],
  imports: [
    PaqueteRoutingModule,
    SharedModule
  ],
  providers: [PaqueteService]
})
export class PaqueteModule { }
