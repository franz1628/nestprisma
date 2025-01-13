import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsDate, IsInt, IsString } from "class-validator"

export class CreateAlumnoDto {  
    @ApiProperty()
    @IsString()
    nombres!          :string  

    @ApiProperty()
    @IsString()
    apellido_paterno! :string   

    @ApiProperty()
    @IsString()
    apellido_materno! :string  

    @ApiProperty()
    @Type(() => Date) 
    @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida (YYYY-MM-DD).' })
    fecha_nacimiento! :Date    

    @ApiProperty()
    @IsString()
    numero_documento! :string      

    @ApiProperty()
    @IsInt()
    id_genero!        :number

    @ApiProperty()
    @IsInt()
    id_tipoDocumento! :number
 
}
