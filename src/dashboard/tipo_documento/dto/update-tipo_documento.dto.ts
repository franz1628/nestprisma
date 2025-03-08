import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTipoDocumentoDto } from './create-tipo_documento.dto';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateTipoDocumentoDto extends PartialType(CreateTipoDocumentoDto) {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsInt({ message: 'El estado debe ser un número entero' })
    estado?: number;
}
