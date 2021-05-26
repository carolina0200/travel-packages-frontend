import { Component, OnInit } from '@angular/core';
import { Loading } from '@core/loading/loading';
import { MenuItem } from '@core/modelo/menu-item';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app-travel-packages'

  public loading: Observable<boolean>;
 
  public items: MenuItem[] = [
    { url: '/home', nombre: 'Pagina principal' },
    { url: '/paquete/listar', nombre: 'Paquetes' },
    { url: '/compra', nombre: 'Compras' }
  ];

  ngOnInit(): void {
    this.loading = Loading.state;
  }

 

  
}
