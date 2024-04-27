export type Config = {
  app: AppConfig;
  mysql: MysqlConfig;
  jwt: JWTConfig;
};

export type AppConfig = {
  port: number;
  host: string;
};
export type MysqlConfig = {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};
export type JWTConfig = {
  accessTokenSecret: string;
  accessTokenExpiration: number;
  refreshTokenSecret: string;
  refreshTokenExpiration: number;
};
