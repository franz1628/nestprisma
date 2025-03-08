export class AlumnoDto{
    id: number;
    email: string;
    nombres: string;
    apellidopaterno: string;
    apellidomaterno: string;
    idtipodocumento: number;
    numerodocumento: string;
    fechanacimiento: Date;
    estado: number | null;
    created_at: Date | null;
    updated_at: Date | null;
    estadomatricula: number | null;
    username: string;


    constructor(id: number, email:string, nombres: string, apellidopaterno: string, apellidomaterno: string, idtipodocumento: number, numerodocumento: string, fechanacimiento: Date, estado: number | null, created_at: Date | null, updated_at: Date | null, estadomatricula: number | null, username: string, password: string){
        this.id = id;
        this.email = email;
        this.nombres = nombres;
        this.apellidopaterno = apellidopaterno;
        this.apellidomaterno = apellidomaterno;
        this.idtipodocumento = idtipodocumento;
        this.numerodocumento = numerodocumento;
        this.fechanacimiento = fechanacimiento;
        this.estado = estado;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.estadomatricula = estadomatricula;
        this.username = username;

    }
    
}