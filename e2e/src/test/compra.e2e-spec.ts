import { AppPage } from "../app.po";
import { CompraPage } from "../page/compra/compra.po";
import { NavbarPage } from "../page/navbar/navbar.po";

describe('workspace-project Compra', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let compra: CompraPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        compra = new CompraPage();
    });

    it('Deberia listar compras', () => {
        page.navigateTo();
        navBar.clickBotonCompras();

        expect(1).toBe(compra.contarCompras());
    });

    it('No deberia editar una compra', () => {
        const CORREO_INCORRECTO = "correo@"
        page.navigateTo();
        navBar.clickBotonCompras();
        compra.clicklinkEditarCompra();
        compra.ingresarCorreoCompra(CORREO_INCORRECTO);
        compra.clicklinkActualizarCompra();
        expect(compra.getSweetAlertText()).toEqual('Oops...');
        compra.clickAlertConfirm();
    });

    it('Deberia editar una compra', () => {
        page.navigateTo();
        navBar.clickBotonCompras();
        compra.clicklinkEditarCompra();
        compra.clicklinkActualizarCompra();
        expect(compra.getSweetAlertText()).toEqual('Actualizada');
        compra.clickAlertConfirm();
    });

    it('Deberia eliminar una compra', () => {
        page.navigateTo();
        navBar.clickBotonCompras();
        compra.clicklinkEditarCompra();
        compra.clickLinkEliminarCompra();
        expect(compra.getSweetAlertText()).toEqual('¿Estás seguro?');
        compra.clickAlertConfirm();
        expect(compra.getSweetAlertText()).toEqual('¡Eliminada!');
        compra.clickAlertConfirm();
    });

});