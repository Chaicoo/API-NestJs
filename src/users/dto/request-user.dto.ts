import { IsBoolean, IsEmpty, IsString, MinLength } from 'class-validator';

export class RequestUserDto {
  @IsString()
  @IsEmpty()
  @MinLength(3)
  firstName: string;

  @IsString()
  @IsEmpty()
  @MinLength(3)
  lastName: string;

  @IsBoolean()
  isActive: boolean;
}
