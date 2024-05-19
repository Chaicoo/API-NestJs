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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  create(@Body() createUserDto: RequestUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/list')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/read/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch('/update/:id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<RequestUserDto>,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
