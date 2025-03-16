import { IsNotEmpty, IsString } from "class-validator";

export class UploadAlumnoDto{
    @IsNotEmpty()
    @IsString()
    idAlumno: string;

    constructor(idAlumno:string){
        this.idAlumno = idAlumno;
    }

}