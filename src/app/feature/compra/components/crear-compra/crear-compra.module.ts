import { DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { CompraService } from "@compra/shared/service/compra.service";
import { SharedModule } from "@shared/shared.module";
import { CrearCompraComponent } from "./crear-compra.component";

@NgModule({
    declarations: [ CrearCompraComponent ],
    imports: [ SharedModule ],
    exports: [ CrearCompraComponent ],
    providers: [ CompraService, DatePipe ]
})
export class CrearCompraModule { }