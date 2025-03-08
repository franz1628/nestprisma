import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AuthResponse {
  token: string;
  tokenType: string;
  username: string;
  email: string;
  role: string;

  constructor(token: string, tokenType: string, username: string, email: string, role: string) {
    this.token = token;
    this.tokenType = tokenType;
    this.username = username;
    this.email = email;
    this.role = role;
  }
}