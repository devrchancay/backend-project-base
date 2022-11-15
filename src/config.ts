import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
  },
  auth: {
    secret: process.env.JWT_SECRET_KEY,
  },
}));

// para tipar
// import {ConfigType} from '@nestjs/config';
// import config from './config';
// @Inject(config.KEY) private configService: ConfigType<typeof config>,
// To use
// this.configService.database.name
