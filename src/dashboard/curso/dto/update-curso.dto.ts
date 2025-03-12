import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCursoDto } from './create-curso.dto';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateCursoDto extends PartialType(CreateCursoDto) {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsInt({ message: 'El estado debe ser un número entero' })
    estado?: number;
}
