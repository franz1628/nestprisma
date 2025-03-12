import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsEmail, IsInt, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAlumnoDto {
    @ApiProperty()
    @IsString()
    @IsEmail( {}, { message: 'El email debe ser un correo electrónico válido' })
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
    @MinLength(8, {message: 'El número de documento debe tener como mínimo 8 caracteres'})
    @MaxLength(12, {message: 'El número de documento debe tener como máximo 12 caracteres'})
    numero_documento: string='';
  
    @ApiProperty()
    @IsDateString({}, { message: 'La fecha de nacimiento debe tener un formato ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)' })
    fecha_nacimiento: Date = new Date();
  
    @ApiProperty()
    @IsInt({message: 'El estado debe ser un número entero'})
    estado_matricula: number=1;

    
  }
