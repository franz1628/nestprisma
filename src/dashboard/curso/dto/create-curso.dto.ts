import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateCursoDto {
    @ApiProperty()
    @IsString()
    descripcion!:string

    @ApiProperty()
    @IsString()
    codigo!:string

    @ApiProperty()
    @IsString()
    creditos!:string
}
