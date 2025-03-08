import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AuthError {
  message: string;
  error: string;
  statusCode: number;

  constructor(message: string, error: string, statusCode: number) {
    this.message = message;
    this.error = error;
    this.statusCode = statusCode;
  }
}