import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignInDto } from './dto/sign-in.dto';
import { Request } from 'express';
import { AccessToken } from 'src/types/auth/access-token.type';
import { JwtAuthGuard } from 'src/guards/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/auth/sign-up')
  async signUp(@Body() newUser: SignInDto): Promise<AccessToken> {
    return await this.userService.signUp(newUser);
  }

  @Post('/auth/sign-in')
  async signIn(@Body() user: SignInDto): Promise<AccessToken> {
    return await this.userService.signIn(user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async getMe(@Req() req: Request) {
    try {
      delete req.user['password'];
      return req.user;
    } catch (err: unknown) {
      throw new InternalServerErrorException(err);
    }
  }
}
