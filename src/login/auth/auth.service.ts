import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.prisma.alumno.findFirst({ where: {  username } });
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
      tokenType: 'Bearer',
      username : 'admin',
      email: 'admin@admin.com',
      role : 'ADMIN'
    };
  }


}
