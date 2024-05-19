import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { UniqueEmail } from './unique-email.validator';

export class RequestUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @Validate(UniqueEmail)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsBoolean()
  isActive: boolean;
}
