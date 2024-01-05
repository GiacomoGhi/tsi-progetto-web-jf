import { BackendConfigService } from '@config';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@services';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: BackendConfigService,
  ) {}

  async sendUserConfirmation(user: UserEntity, token: string) {
    const url = `${
      this.configService.getConfiguration().baseApiUrl
    }auth/confirm-email?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <fj@tsiprogetto.com>',
      subject: 'Welcome to Fabio and Jack App! Confirm your Email',
      template: './confirmation',
      context: {
        name: user.name,
        url,
      },
    });
  }
}
