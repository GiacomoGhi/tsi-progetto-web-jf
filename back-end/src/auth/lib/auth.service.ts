import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable } from 'rxjs';
import { AuthenticatedUser } from '@common';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '@services';
import { UserService } from '@services';
import { UserEntityDto } from 'src/controllers/lib/dto/user-entity.dto';
import { randomUUID } from 'crypto';
import { UserSingUp } from 'src/common/lib/user-sing-up';
import { MailService } from 'src/mail/lib/mail.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  async getUser(token: string) {
    const userInfo = this.jwtService.decode(token) as AuthenticatedUser;
    try {
      const user = await this.userService.findOneByCondition({
        where: {
          id: userInfo.id,
        },
      });
      return user;
    } catch (error) {
      return {
        error: 'user not found',
      };
    }
  }

  async login(body: { email: string; password: string }) {
    let user: UserEntity | null;
    try {
      user = await this.userService.findOneByCondition({
        where: {
          email: body.email,
        },
      });
    } catch (error) {
      this.invalidCredentialsExeption(0);
    }

    if (!user.active) {
      this.invalidCredentialsExeption(0);
    }

    const validPassword = await this.comparePasswords(
      body.password,
      user.passwordHash,
    );

    if (validPassword) {
      const response: AuthenticatedUser = {
        id: user.id,
        email: user.email,
        firstName: user.name,
        lastName: user.surname,
        role: user.role,
      };

      return await this.generateJwt(response);
    } else {
      this.invalidCredentialsExeption(0);
    }
  }

  async create(body: UserSingUp) {
    let userExist: boolean;
    try {
      const user = await this.userService.findOneByCondition({
        where: {
          email: body.email,
        },
      });
      userExist = true;
    } catch (error) {
      if (!userExist) {
        if (!this.emailFormatValidator(body.email)) {
          return this.invalidCredentialsExeption(2);
        }
        const user = await this.userService.findAll();
        const systemUserId = '10000000-0000-0000-0000-000000000001';
        const passwordHash = await this.hashPassword(body.password);

        const userToAdd = {
          id: randomUUID(),
          email: body.email,
          name: body.firstName,
          surname: body.lastName,
          passwordHash: passwordHash,
          profession: body.profession,
          role: 0,
          nickName: body.nickName,
          active: false,
        } as UserEntity;

        await this.userService.insert(systemUserId, userToAdd);
        await this.mailService.sendUserConfirmation(userToAdd, userToAdd.id); // TODO set the correct token
        return 'successfull registration';
      } else return this.invalidCredentialsExeption(1);
    }
  }

  async validateEmail(userId: string) {
    const systemUserId = '10000000-0000-0000-0000-000000000001';

    try {
      const user = await this.userService.findOneByCondition({
        where: {
          id: userId,
        },
      });
      user.active = true;
      await this.userService.update(systemUserId, user.id, user);
      return { status: true };
    } catch (error) {
      this.invalidCredentialsExeption(3);
    }
  }

  invalidCredentialsExeption(value: number) {
    switch (value) {
      case 0:
        throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
      case 1:
        throw new HttpException('Email already in use', HttpStatus.CONFLICT);
      case 2:
        throw new HttpException('Ivalid email format', HttpStatus.CONFLICT);
      case 3:
        throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
      default:
        throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  emailFormatValidator(email: string) {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async generateJwt(user: AuthenticatedUser) {
    return await this.jwtService.signAsync({ user });
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }

  async comparePasswords(password: string, storedPasswordHash: string) {
    const res = await bcrypt.compare(password, storedPasswordHash);
    this.logger.debug('res: ' + res);
    return res;
  }
}
