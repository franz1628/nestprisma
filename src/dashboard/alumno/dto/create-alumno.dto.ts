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
    apellidopaterno: string='';
  
    @ApiProperty()
    @IsString()
    apellidomaterno: string='';
  
    @ApiProperty()
    @IsInt({message: 'El estado debe ser un número entero'})
    idtipodocumento: number=1;
  
    @ApiProperty()
    @IsString()
    numerodocumento: string='';
  
    @ApiProperty()
    @IsDateString({}, { message: 'La fecha de nacimiento debe tener un formato ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)' })
    fechanacimiento: Date = new Date();
  
    @ApiProperty()
    @IsInt({message: 'El estado debe ser un número entero'})
    estadomatricula: number=1;

    
  }
