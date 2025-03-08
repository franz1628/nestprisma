import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsInt, IsNumber, IsString } from "class-validator";

export class CreateAlumnoDto {
    @ApiProperty()
    @IsString()
    email: string='';

    @ApiProperty()
    @IsString()
    username: string='';

    @ApiProperty()
    @IsString()
    password: string='';

    @ApiProperty()
    @IsString()
    nombres: string='';
  
    @ApiProperty()
    @IsString()
    apellido_paterno: string='';
  
    @ApiProperty()
    @IsString()
    apellido_materno: string='';
  
    @ApiProperty()
    @IsInt({message: 'El estado debe ser un número entero'})
    id_tipo_documento: number=1;

    @ApiProperty()
    @IsInt({message: 'El genero debe ser un número entero'})
    id_genero: number=1;
  
    @ApiProperty()
    @IsString()
    numero_documento: string='';
  
    @ApiProperty()
    @IsDateString({}, { message: 'La fecha de nacimiento debe tener un formato ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)' })
    fecha_nacimiento: Date = new Date();
  
    @ApiProperty()
    @IsInt({message: 'El estado debe ser un número entero'})
    estado_matricula: number=1;

    
  }
