import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import bcrypt from "bcrypt";
import { AuthRequest } from './dto/auth-request';
import { AlumnoDto } from 'src/dashboard/alumno/dto/alumno.dto';
import { AuthResponse } from './dto/auth-response';
import { AuthError } from './dto/auth-error';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<AlumnoDto | null> {
    const user = await this.prisma.alumno.findFirst({ where: {  username } });
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: AuthRequest) :  Promise<AuthResponse | AuthError> {
    const alumno = await this.validateUser(user.username, user.password);
    if (alumno) {
      const payload = { username: user.username, sub: user.password };
      console.log(payload);
      
      return {
        token: this.jwtService.sign(payload),
        tokenType: 'Bearer',
        username : alumno.username,
        email: alumno.email,
        role : 'ADMIN'
      };
    }else{
      return {
        error: 'Usuario o contraseña',
        message: 'Usuario o contraseña incorrectos',
        statusCode : 401
      }
    }
  }

}
