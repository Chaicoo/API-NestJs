import { UserEntity } from '../entities/user.entity';

export class ResponseUserDto {
  id: string;
  firstName: string;
  lastName: string;
  isActive: boolean;

  constructor(user: Partial<UserEntity>) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.isActive = user.isActive;
  }
}
