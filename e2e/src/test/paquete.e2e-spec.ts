import { AppPage } from "../app.po";
import { NavbarPage } from "../page/navbar/navbar.po";
import { PaquetePage } from "../page/paquete/paquete.po";

describe('workspace-project Paquete', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let paquete: PaquetePage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        paquete = new PaquetePage();
    });

    it('Deberia crear paquete', () => {
        const PRECIO_PAQUETE = 10000;
        const CIUDAD_PAQUETE = 'cartagena';
        const HOTEL_PAQUETE = 'hotel';
        const DESCRIPCION_PAQUETE = 'descripcion'

        page.navigateTo();
        navBar.clickBotonPaquetes();
        paquete.clickBotonCrearPaquete();
        paquete.ingresarPrecio(PRECIO_PAQUETE);
        paquete.ingresarCiudad(CIUDAD_PAQUETE);
        paquete.ingresarHotel(HOTEL_PAQUETE);
        paquete.ingresarDescripcion(DESCRIPCION_PAQUETE);
        paquete.clickBotonGuardarPaquete();
        expect(paquete.getSweetAlertText()).toEqual('Guardado con exito');
    });

    it('Deberia editar paquete', () => {
        const HOTEL_PAQUETE_EDICION = 'Decameron';

        page.navigateTo();
        navBar.clickBotonPaquetes();
        paquete.clickBotonEditarPaquete();
        paquete.ingresarHotel(HOTEL_PAQUETE_EDICION)
        paquete.clickBotonGuardarPaquete();
        expect(paquete.getSweetAlertText()).toEqual('Actualizado con exito');
        paquete.clickAlertConfirm();
    });

    it('Deberia crear una compra', () => {
        const NOMBRE_COMPRA = 'Desconocido Apellido';
        const CORREO_COMPRA = 'desconocido@gmail.com';

        page.navigateTo();
        navBar.clickBotonPaquetes();
        paquete.clickBotonComprarPaquete();
        paquete.clickBotonContinuarCalculo();
        paquete.ingresarNombreCompra(NOMBRE_COMPRA);
        paquete.ingresarCorreoCompra(CORREO_COMPRA);
        paquete.clickBotonPagarPaquete();
        expect(paquete.getSweetAlertText()).toEqual('Felicidades');
        paquete.clickAlertConfirm();
    })

    it('Deberia listar paquetes', () => {
        page.navigateTo();
        navBar.clickBotonPaquetes();
        paquete.clickBotonListarPaquetes();

        expect(1).toBe(paquete.contarPaquetes());
    });
});