import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompraComponent } from './components/compra/compra.component';
import { ListarCompraComponent } from './components/listar-compra/listar-compra.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/compra/listar',
    pathMatch: 'full'
  },
  {
    path: '',
    component: CompraComponent,
    children: [
      {
        path: 'listar',
        component: ListarCompraComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompraRoutingModule { }
