export class CursoDto{
    id: number;
    nombre: string;
    estado: number | null;
    created_at: Date | null;
    updated_at: Date | null;

    constructor(id: number, nombre: string, estado: number | null, created_at: Date | null, updated_at: Date | null){
        this.id = id;
        this.nombre = nombre;
        this.estado = estado;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}