import { by, element } from "protractor";

export class CompraPage {
    private linkEditarCompra = element(by.id('0-editarCompra'));
    private linkActualizarCompra = element(by.id('actualizarCompra'));
    private linkEliminarCompra = element(by.id('eliminarCompra'));
    private listaCompras = element.all(by.css('table tbody tr'));
    private inputCorreoCompra = element(by.id('correo'));
    private sweetalertConfirmButton = element(by.css('swal2-confirm'));
    private sweetalertTitle = element(by.id('swal2-title'));

    async clicklinkEditarCompra() {
        await this.linkEditarCompra.click();
    }

    async clicklinkActualizarCompra() {
        await this.linkActualizarCompra.click();
    }

    async clickLinkEliminarCompra() {
        await this.linkEliminarCompra.click();
    }

    async contarCompras() {
        return (await this.listaCompras).length;
    }

    async getSweetAlertText() {
        await this.sweetalertTitle.getText();
    }

    async clickAlertConfirm() {
        await this.sweetalertConfirmButton.click();
    }
    
    async ingresarCorreoCompra(correoCompra) {
        await this.inputCorreoCompra.sendKeys(correoCompra);
    }
}