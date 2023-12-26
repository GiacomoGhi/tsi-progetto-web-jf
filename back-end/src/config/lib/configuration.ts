import { ConfigInterface } from './config.interface';

export default () => ({
  app: {
    dbConnectionString: process.env['DATABASE_CONNECTION_STRING'] ?? '',
    dbHost: process.env['DATABASE_HOST'] ?? '',
    dbPort: process.env['DATABASE_PORT'] ?? 0,
    dbName: process.env['DATABASE_NAME'] ?? '',
    dbUser: process.env['DATABASE_USER'] ?? '',
    dbPassword: process.env['DATABASE_PASSWORD'] ?? '',
  } as ConfigInterface,
});


