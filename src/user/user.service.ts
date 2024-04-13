import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signUp(user: SignInDto) {
    user.password = await bcrypt.hash(user.password, 10);

    const newUser = await this.prisma.user.create({
      data: user,
    });

    const token = await this.jwtService.signAsync(
      {},
      { jwtid: uuidv4(), subject: newUser.id },
    );

    return { user: newUser, token };
  }

  async signIn(user: SignInDto) {
    const foundUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!foundUser) throw new Error('User not found');

    const isPasswordValid = await bcrypt.compare(
      user.password,
      foundUser.password,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException();

    const token = await this.jwtService.signAsync(
      {},
      { jwtid: uuidv4(), subject: foundUser.id },
    );

    return { user: foundUser, token };
  }
}
