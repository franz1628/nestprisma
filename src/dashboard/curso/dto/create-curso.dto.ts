import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCursoDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'El nombre es requerido' })
    nombre: string = '';
}
