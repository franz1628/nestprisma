import { ApiProperty } from "@nestjs/swagger"

export class PeriodoDto {
    @ApiProperty()
    id!:number

    @ApiProperty()
    descripcion!:string

    @ApiProperty()
    anio!:number

    @ApiProperty()
    numero!:number

    @ApiProperty()
    estado!:number

    @ApiProperty()
    created_at!:Date

    @ApiProperty()
    updated_at!:Date
}
