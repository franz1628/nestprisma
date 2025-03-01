import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalAuthGuard } from './localAuthGuard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';


@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalAuthGuard,PrismaService],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), 
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
    PassportModule
  ],
})
export class AuthModule {}
