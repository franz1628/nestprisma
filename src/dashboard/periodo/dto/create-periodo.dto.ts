import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsString } from "class-validator"

export class CreatePeriodoDto {
    @ApiProperty()
    @IsString()
    descripcion!:string

    @ApiProperty()
    @IsInt()
    anio!:number

    @ApiProperty()
    @IsInt()
    numero!:number
}
