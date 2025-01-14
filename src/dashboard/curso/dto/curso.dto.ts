import { ApiProperty } from "@nestjs/swagger";

export class CursoDto {
    @ApiProperty()
    id!:number

    @ApiProperty()
    descripcion!:string

    @ApiProperty()
    codigo!:string

    @ApiProperty()
    creditos!:string

    @ApiProperty()
    estado!:number

    @ApiProperty()
    created_at!:Date

    @ApiProperty()
    updated_at!:Date
}
