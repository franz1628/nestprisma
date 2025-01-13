import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateTipoDocumentoDto {
    
    @ApiProperty()
    @IsString()
    descripcion!: string;
}
