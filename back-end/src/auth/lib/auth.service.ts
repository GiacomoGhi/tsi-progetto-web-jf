import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigInterface } from '@config';
import { UserEntity, UserService } from '@services';
import { Role } from '@interfaces';
import { AuthenticatedUser } from '@common';
import bcrypt from 'bcrypt';
import { from } from 'rxjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigInterface,
    private readonly userService: UserService,
  ) {}

  intToUuidV4(int: number): string {
    // Check if input is valid
    if (typeof int !== 'number') {
      throw new Error('Input must be a number');
    }

    // Convert the integer to a hex string
    const intString = int.toString();

    // Pad the hex string to the correct length
    const paddedIntString = intString.padStart(32, '0');

    // Insert the UUID v4 format
    const uuidV4 = `${paddedIntString.substr(0, 8)}-${paddedIntString.substr(
      8,
      4,
    )}-${paddedIntString.substr(12, 4)}-${paddedIntString.substr(
      16,
      4,
    )}-${paddedIntString.substr(20)}`;

    return uuidV4;
  }

  async getLoggedUser(
    user: AuthenticatedUser,
  ): Promise<UserEntity & { role: Role }> {
    const users = await this.userService.findAll({
      where: {
        id: user.id,
      },
    });

    if (!users.length) {
      const newUser = await this.userService.insert(null, {
        ...user,
        active: true,
      });

      return {
        ...newUser,
        role: user.role,
      };
    } else {
      return { ...users[0], role: user.role };
    }
  }

  async loginFromApiKey(): Promise<any> {
    const user = await this.userService.findOneByCondition({
      where: {
        email: 'system',
      },
    });

    const tokenPayload = {
      sub: user.id,
      firstName: 'system',
      lastName: '',
    };

    return {
      access_token: this.jwtService.sign(tokenPayload),
    };
  }

  async validateApiKey(apiKey: string): Promise<boolean> {
    return this.config.nodeEnv + '_ap1k37_00000' === apiKey;
  }

  async loginFromCredentials(credentials: {
    email: string;
    password: string;
  }): Promise<any> {
    const user = await this.userService.findOneByCondition({
      where: {
        email: credentials.email,
      },
    });
    if (user) {
      // const hash = await bcrypt.hash(credentials.password, 12);
      // const auth = await bcrypt.compare(hash, user.passwordHash);

      const auth = credentials.password === user.passwordHash;

      if (auth) {
        const tokenPayload = {
          sub: user.id,
          firstName: 'system',
          lastName: '',
        };
        return {
          access_token: this.jwtService.sign(tokenPayload),
        };
      }
    }
  }

  // async loginFromCredetials(): Promise<any> {
  //   const user = await this.userService.findOneByCondition({
  //     where: {
  //       email: 'system',
  //     },
  //   });

  //   const tokenPayload = {
  //     sub: user.id,
  //     firstName: 'system',
  //     lastName: '',
  //   };

  //   return {
  //     access_token: this.jwtService.sign(tokenPayload),
  //   };
  // }
}
