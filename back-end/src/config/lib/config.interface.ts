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
}
