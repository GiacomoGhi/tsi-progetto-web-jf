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

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(body: { email: string; password: string }) {
    this.logger.debug('body: ' + JSON.stringify(body));
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
        role: 0, //TODO get role from user entity
      };

      return await this.generateJwt(response);
    } else {
      this.invalidCredentialsExeption(0);
    }
  }

  async create(body: UserSingUp) {
    let userExist: boolean;
    try {
      this.logger.debug('body: ' + JSON.stringify(body));
      const user = await this.userService.findOneByCondition({
        //TODO always return false
        where: {
          email: body.email,
        },
      });
      this.invalidCredentialsExeption(1);
    } catch (error) {
      const user = await this.userService.findAll();
      this.logger.debug('users: ' + JSON.stringify(user));
      const systemUserId = '10000000-0000-0000-0000-000000000001';
      const passwordHash = await this.hashPassword(body.password);

      const userToAdd = {
        id: randomUUID(),
        email: body.email,
        name: body.firstName,
        surname: body.lastName,
        passwordHash: passwordHash,
        profession: body.profession,
        active: true, //TODO set false as default and implement email verification
      } as UserEntity;

      this.userService.insert(systemUserId, userToAdd);
    }
  }

  invalidCredentialsExeption(value: number) {
    switch (value) {
      case 0:
        throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
      case 1:
        throw new HttpException('Email already in use', HttpStatus.CONFLICT);
      default:
        throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
