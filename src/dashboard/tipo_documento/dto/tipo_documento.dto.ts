import { Expose } from "class-transformer";

export class TipoDocumentoDto {
    @Expose()
    id: number;

    @Expose()
    descripcion: string;

    constructor(id: number, descripcion: string) {
        this.id = id;
        this.descripcion = descripcion;
    }
}