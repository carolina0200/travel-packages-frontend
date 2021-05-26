export class Paquete {
    id: number;
    precio: number;
    estado: string;
    ciudad: string;
    hotel: string;
    descripcion: string;
    cupos: number;
    dias: number;
    fechaCreacion: string;

    constructor() {}

    public withFechaCreacion(): Paquete {
        const fechaArray = new Date().toJSON().split('T');
        this.fechaCreacion = `${fechaArray[0]} ${fechaArray[1].split('.')[0]}`;
        return this;
    }

    public withPartial(partial: Partial<Paquete>): Paquete {
       return {...this, ...partial};
    }
}
