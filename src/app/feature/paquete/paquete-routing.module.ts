import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioPaqueteComponent } from './components/formulario-paquete/formulario-paquete.component';
import { ListarPaqueteComponent } from './components/listar-paquete/listar-paquete.component';
import { PaqueteComponent } from './components/paquete/paquete.component';


const routes: Routes = [
  
  {
    path: '',
    component: PaqueteComponent,
    children: [
      {
        path: 'listar',
        component: ListarPaqueteComponent
      },
      {
        path: 'crear',
        component: FormularioPaqueteComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/paquete/listar',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaqueteRoutingModule { }
