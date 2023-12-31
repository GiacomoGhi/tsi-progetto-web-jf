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
  } as ConfigInterface,
});
