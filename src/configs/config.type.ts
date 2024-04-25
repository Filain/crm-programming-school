export type Config = {
  app: AppConfig;
  mysql: MysqlConfig;
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
