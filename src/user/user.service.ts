import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { AccessToken } from 'src/types/auth/access-token.type';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signUp(user: SignInDto): Promise<AccessToken> {
    const foundUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });
    if (foundUser) throw new BadRequestException('User already exists');
    user.password = await bcrypt.hash(user.password, 10);

    const newUser = await this.prisma.user.create({
      data: user,
    });

    const token = await this.jwtService.signAsync(
      {},
      { jwtid: uuidv4(), subject: newUser.id },
    );

    return { accessToken: token };
  }

  async signIn(user: SignInDto): Promise<AccessToken> {
    const foundUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!foundUser) throw new Error('User not found');

    const isPasswordValid = await bcrypt.compare(
      user.password,
      foundUser.password,
    );

    if (!isPasswordValid) throw new UnauthorizedException();

    const token = await this.jwtService.signAsync(
      {},
      { jwtid: uuidv4(), subject: foundUser.id },
    );

    return { accessToken: token };
  }
  
  async getById(id: string) {
    return await this.prisma.user.findUniqueOrThrow({ where: { id } });
  }
}
