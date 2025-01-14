import { ApiProperty } from "@nestjs/swagger";

export class TipoDocumentoDto {
    @ApiProperty()
    id!:number

    @ApiProperty()
    descripcion!:string

    @ApiProperty()
    estado!:number

    @ApiProperty()
    created_at!:Date

    @ApiProperty()
    updated_at!:Date
}
