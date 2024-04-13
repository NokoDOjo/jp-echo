import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignInDto } from './dto/sign-in.dto';
import { User } from '@prisma/client';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/auth/sign-up')
  async signUp(
    @Body() newUser: SignInDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const { user, token }: { user: Partial<User>; token: string } =
        await this.userService.signUp(newUser);

      delete user.password;

      res.cookie('access-token', token, { httpOnly: true });

      res.status(201).send({ user: user });
    } catch (err: unknown) {
      throw new InternalServerErrorException(err);
    }
  }
}
