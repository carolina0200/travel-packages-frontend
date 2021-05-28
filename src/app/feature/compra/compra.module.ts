import { NgModule } from '@angular/core';
import { CompraComponent } from './components/compra/compra.component';
import { ListarCompraComponent } from './components/listar-compra/listar-compra.component';
import { CompraService } from './shared/service/compra.service';
import { SharedModule } from '@shared/shared.module';
import { CompraRoutingModule } from './compra-routing.module';
import { EditarCompraComponent } from './components/editar-compra/editar-compra.component';
import { DatePipe } from '@angular/common';
import { ManejadorError } from '@core/interceptor/manejador-error';

@NgModule({
  declarations: [
    CompraComponent,
    ListarCompraComponent,
    EditarCompraComponent
  ],
  imports: [
    CompraRoutingModule,
    SharedModule
  ],
  providers: [ CompraService, DatePipe, ManejadorError ]
})
export class CompraModule { }
