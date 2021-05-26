import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styles: [`:host {
    border: 0 solid #e1e1e1;
    border-bottom-width: 1px;
    display: block;
  }`],
})
export class NavbarComponent implements OnInit {

  @Input()
  items: MenuItem[];

  constructor() { }

  ngOnInit() {
  }

}
