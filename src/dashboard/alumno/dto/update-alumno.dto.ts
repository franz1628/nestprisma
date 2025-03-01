import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAlumnoDto } from './create-alumno.dto';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateAlumnoDto extends PartialType(CreateAlumnoDto) {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ message: 'El estado debe ser un número entero' })
  estado?: number;
}