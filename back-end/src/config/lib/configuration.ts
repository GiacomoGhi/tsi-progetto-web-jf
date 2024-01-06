import { ConfigInterface } from './config.interface';

export default () => ({
  app: {
    nodeEnv: process.env['NODE' + '_ENV'] ?? '',
    dbConnectionString: process.env['DATABASE_CONNECTION_STRING'] ?? '',
    dbHost: process.env['DATABASE_HOST'] ?? '',
    dbPort: process.env['DATABASE_PORT'] ?? 0,
    dbName: process.env['DATABASE_NAME'] ?? '',
    dbUser: process.env['DATABASE_USER'] ?? '',
    dbPassword: process.env['DATABASE_PASSWORD'] ?? '',
    authBaseUrl: process.env['AUTH_BASE_URL'] ?? '',
    authClientId: process.env['AUTH_CLIENT_ID'] ?? '',
    authApplicationId: process.env['AUTH_APPLICATION_ID'] ?? '',
    jwtSecret: process.env['JWT_SECRET'] ?? '',
    mailHost: process.env['MAIL_HOST'] ?? '',
    mailUser: process.env['MAIL_USER'] ?? '',
    mailPassword: process.env['MAIL_PASSWORD'] ?? '',
    mailFrom: process.env['MAIL_FROM'] ?? '',
    mailTransport: process.env['MAIL_TRANSPORT'] ?? '',
    baseApiUrl: process.env['BASE_API_URL'] ?? '',
  } as ConfigInterface,
});
