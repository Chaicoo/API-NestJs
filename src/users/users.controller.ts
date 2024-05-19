import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RequestUserDto } from './dto/request-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

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
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new BadRequestException('Email ou senha inválidos!');
    }

    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/list')
  async findAll() {
    const allUsers = await this.usersService.findAll();
    return allUsers.map((user: UserEntity) => new ResponseUserDto(user));
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/read/:id')
  async findOne(@Param('id') id: string) {
    const foundUser = await this.usersService.findOne(+id);
    return new ResponseUserDto(foundUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<RequestUserDto>,
  ) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}
