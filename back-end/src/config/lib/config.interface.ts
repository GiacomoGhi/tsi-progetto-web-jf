export interface ConfigInterface {
  dbConnectionString: string;
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUser: string;
  dbPassword: string;
  authBaseUrl: string;
  authClientId: string;
  authApplicationId: string;
  nodeEnv: string | 'local' | 'test' | 'prod';
  jwtSecret: string;
  mailHost: string;
  mailUser: string;
  mailPassword: string;
  mailFrom: string;
  mailTransport: string;
  baseApiUrl: string;
  adminUrl: string;
}
