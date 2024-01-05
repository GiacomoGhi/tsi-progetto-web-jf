import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { BackendConfigModule, BackendConfigService } from '@config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [BackendConfigModule],
      inject: [BackendConfigService],
      useFactory: async (configProvider: BackendConfigService) => {
        const config = configProvider.getConfiguration();
        return {
          transport: {
            host: config.mailHost,
            secure: false,
            auth: {
              user: config.mailUser,
              pass: config.mailPassword,
            },
          },
          defaults: {
            from: `"No Reply" <${config.mailFrom}>`,
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class BackendMailModule {}
