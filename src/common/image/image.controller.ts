import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname, join } from 'path';
import { existsSync, mkdirSync, renameSync } from 'fs';
import { UploadAlumnoDto } from 'src/dashboard/alumno/dto/upload-alumno.dto';

@Controller('image')
export class ImageController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {}),
  )
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({ validators: [ new MaxFileSizeValidator({ maxSize: 1000000 })], exceptionFactory() {throw Error('Error de tamanio') } }),
      new ParseFilePipe({ validators: [ new FileTypeValidator({ fileType: 'image/png' })], exceptionFactory() {throw Error('Error de formato')},
      })
    ) file: Express.Multer.File,
    @Body() body: UploadAlumnoDto,
  ) {

    // Nueva ubicación y nombre después de subirlo
    const newFolder = join('uploads', body.idAlumno.toString());
    const newFilename = `1${extname(file.originalname)}`;

    // Asegurar que la nueva carpeta existe
    if (!existsSync(newFolder)) {
      mkdirSync(newFolder, { recursive: true });
    }

    // Mover y renombrar archivo
    const oldPath = file.path; // Ruta original en la carpeta 'temp'
    const newPath = join(newFolder, newFilename);

    renameSync(oldPath, newPath); // Mueve y renombra el archivo

    return {
      message: 'Archivo subido correctamente',
      filename: newFilename,
      path: newPath,
    };
  }
}
