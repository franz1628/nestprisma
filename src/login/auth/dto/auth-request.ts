import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AuthRequest {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}