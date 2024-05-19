/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UsersService } from '../users.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueEmail implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(email: string, args: ValidationArguments) {
    const user = await this.usersService.findByEmail(email);
    return !user;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Email $value já está em uso.';
  }
}
