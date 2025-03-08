import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTipoDocumentoDto {
        @ApiProperty()
        @IsString()
        descripcion: string='';
}
