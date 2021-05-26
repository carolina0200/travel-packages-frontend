import { by, element } from "protractor";

export class PaquetePage {
    private linkCrearPaquete = element(by.id('linkCrearPaquete'));
    private linkGuardarPaquete = element(by.id('guardarPaquete'));
    private linkListarPaquetes = element(by.id('linkListarPaquete'));

    private botonEditarPaquete = element(by.id('0-editarPaquete'));
    private botonComprarPaquete = element(by.id('0-comparPaquete'));
    private botonContinuarCalculo = element(by.id('continuarCalculo'));
    private botonPagarPaquete = element(by.id('pagarPaquete'));
    private botonVolverACompra = element(by.id('volver'));

    private inputPrecioPaquete = element(by.id('precio'));
    private inputCiudadPaquete = element(by.id('ciudad'));
    private inputHotelPaquete = element(by.id('hotel'));
    private inputDescripcionPaquete = element(by.id('descripcion'));
    private inputNombreCompra = element(by.id('nombre'));
    private inputCorreoCompra = element(by.id('correo'));

    private listaPaquetes = element.all(by.css('ul.paquetes li'));
    private sweetalertTitle = element(by.id('swal2-title'));
    private sweetalertConfirmButton = element(by.css('swal2-confirm'));

    async clickBotonCrearPaquete() {
        await this.linkCrearPaquete.click();
    }

    async clickBotonGuardarPaquete() {
        await this.linkGuardarPaquete.click();
    }

    async clickBotonListarPaquetes() {
        await this.linkListarPaquetes.click();
    }

    async clickBotonEditarPaquete() {
        await this.botonEditarPaquete.click();
    }

    async clickBotonComprarPaquete() {
        await this.botonComprarPaquete.click();
    }

    async clickBotonContinuarCalculo(){
        await this.botonContinuarCalculo.click();
    }

    async clickBotonPagarPaquete() {
        await this.botonPagarPaquete.click();
    }

    async clickBotonVolverACompra() {
        await this.botonVolverACompra.click();
    }

    async ingresarPrecio(precio) {
        await this.inputPrecioPaquete.sendKeys(precio);
    }

    async ingresarCiudad(ciudad) {
        await this.inputCiudadPaquete.sendKeys(ciudad);
    }

    async ingresarHotel(hotel) {
        await this.inputHotelPaquete.sendKeys(hotel);
    }

    async ingresarDescripcion(descripcion) {
        await this.inputDescripcionPaquete.sendKeys(descripcion);
    }

    async ingresarNombreCompra(nombreCompra) {
        await this.inputNombreCompra.sendKeys(nombreCompra);
    }

    async ingresarCorreoCompra(correoCompra) {
        await this.inputCorreoCompra.sendKeys(correoCompra);
    }

    async contarPaquetes() {
        return this.listaPaquetes.count();
    }

    async getSweetAlertText() {
        await this.sweetalertTitle.getText();
    }

    async clickAlertConfirm() {
        await this.sweetalertConfirmButton.click();
    }
    
}