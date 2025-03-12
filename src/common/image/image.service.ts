import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';


@Injectable()
export class ImageService {
  constructor() {}

  async saveImage(filename: string): Promise<any> {
    
  }
}
