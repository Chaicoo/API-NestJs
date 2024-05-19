import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RequestUserDto } from './dto/request-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  async create(@Body() createUserDto: RequestUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    const creatUser = await this.usersService.create(createUserDto);

    return new ResponseUserDto(creatUser);
  }

  @Post('/validate')
  async validate(
    @Body() { email, password }: { email: string; password: string },
  ) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }

    return new ResponseUserDto(user);
  }

  @Get('/list')
  async findAll() {
    const allUsers = await this.usersService.findAll();
    return allUsers.map((user: UserEntity) => new ResponseUserDto(user));
  }

  @Get('/read/:id')
  async findOne(@Param('id') id: string) {
    const foundUser = await this.usersService.findOne(+id);
    return new ResponseUserDto(foundUser);
  }

  @Patch('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<RequestUserDto>,
  ) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete('/delete/:id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}
