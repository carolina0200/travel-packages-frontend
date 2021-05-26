import { by, element } from 'protractor';

export class NavbarPage {
    linkHome = element(by.xpath('/html/body/app-root/app-navbar/nav/div/div/ul/li/a[1]'));
    linkPaquetes = element(by.xpath('/html/body/app-root/app-navbar/nav/div/div/ul/li/a[2]'));
    linkCompras = element(by.xpath('/html/body/app-root/app-navbar/nav/div/div/ul/li/a[3]'));

    async clickBotonCompras() {
        await this.linkCompras.click();
    }

    async clickBotonPaquetes() {
        await this.linkPaquetes.click();
    }
}
