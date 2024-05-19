import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RequestUserDto } from './dto/request-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  async create(@Body() createUserDto: RequestUserDto) {
    const creatUser = await this.usersService.create(createUserDto);

    return new ResponseUserDto(creatUser);
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
