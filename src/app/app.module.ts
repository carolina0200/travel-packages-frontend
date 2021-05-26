import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from '@home/home.component';
import { CoreModule } from '@core/core.module';
import { PaqueteModule } from '@paquete/paquete.module';
import { CookieService } from 'ngx-cookie-service';
import { CompraModule } from '@compra/compra.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PaqueteModule,
    CompraModule,
    CoreModule
  ],
  providers: [CookieService],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
