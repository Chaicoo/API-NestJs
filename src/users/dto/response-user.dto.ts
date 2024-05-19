import { UserEntity } from '../entities/user.entity';

export class ResponseUserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;

  constructor(user: Partial<UserEntity>) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.isActive = user.isActive;
  }
}
