import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthRequest } from './dto/auth-request';
import { LocalAuthGuard } from './localAuthGuard';


@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

 
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() req: AuthRequest) {
    return this.authService.login(req);
  }
  


}
