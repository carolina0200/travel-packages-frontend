import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompraComponent } from './components/compra/compra.component';
import { ListarCompraComponent } from './components/listar-compra/listar-compra.component';
import { FormularioCompraComponent } from './components/formulario-compra/formulario-compra.component';
import { CompraService } from './shared/service/compra.service';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    CompraComponent,
    ListarCompraComponent,
    FormularioCompraComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [ CompraService ]
})
export class CompraModule { }
