import { NgModule } from '@angular/core';
import { CompraComponent } from './components/compra/compra.component';
import { ListarCompraComponent } from './components/listar-compra/listar-compra.component';
import { CompraService } from './shared/service/compra.service';
import { SharedModule } from '@shared/shared.module';
import { CompraRoutingModule } from './compra-routing.module';
import { CrearCompraComponent } from './components/crear-compra/crear-compra.component';
import { EditarCompraComponent } from './components/editar-compra/editar-compra.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    CompraComponent,
    ListarCompraComponent,
    CrearCompraComponent,
    EditarCompraComponent
  ],
  imports: [
    CompraRoutingModule,
    SharedModule
  ],
  exports: [ CrearCompraComponent ],
  providers: [ CompraService, DatePipe ]
})
export class CompraModule { }
