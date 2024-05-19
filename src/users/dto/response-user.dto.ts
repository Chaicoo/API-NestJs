import { PartialType } from '@nestjs/mapped-types';
import { RequestUserDto } from './request-user.dto';

export class ResponseUserDto extends PartialType(RequestUserDto) {}
