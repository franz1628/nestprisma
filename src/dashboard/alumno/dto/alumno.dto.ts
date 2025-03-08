export class AlumnoDto{
    id: number;
    email: string;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    id_tipo_documento: number;
    id_genero: number;
    numero_documento: string;
    fecha_nacimiento: Date;
    estado: number | null;
    created_at: Date | null;
    updated_at: Date | null;
    estado_matricula: number | null;
    username: string;

    constructor(id: number, email: string, nombres: string, apellido_paterno: string, apellido_materno: string, id_tipo_documento: number, id_genero: number, numero_documento: string, fecha_nacimiento: Date, estado: number | null, created_at: Date | null, updated_at: Date | null, estado_matricula: number | null, username: string){
        this.id = id;
        this.email = email;
        this.nombres = nombres;
        this.apellido_paterno = apellido_paterno;
        this.apellido_materno = apellido_materno;
        this.id_tipo_documento = id_tipo_documento;
        this.id_genero = id_genero;
        this.numero_documento = numero_documento;
        this.fecha_nacimiento = fecha_nacimiento;
        this.estado = estado;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.estado_matricula = estado_matricula;
        this.username = username;
    }
}