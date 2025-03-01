import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateGeneroDto } from './create-genero.dto';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateGeneroDto extends PartialType(CreateGeneroDto) {
      @ApiProperty({ required: false })
      @IsOptional()
      @IsInt({ message: 'El estado debe ser un número entero' })
      estado?: number;
}
