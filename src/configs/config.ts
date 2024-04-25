import { Config } from './config.type';

export default (): Config => ({
  app: {
    port: parseInt(process.env.APP_PORT) || 3000,
    host: process.env.APP_HOST || '0.0.0.0',
  },
  mysql: {
    type: process.env.TYPE || 'mysql',
    host: process.env.HOST || 'owu.linkpc.net',
    port: parseInt(process.env.PORT) || 3306,
    username: process.env.USERNAM || 'fil32',
    password: process.env.PASSWORD || 'admin',
    database: process.env.DATABASE_NAME || 'fil32',
  },
});
