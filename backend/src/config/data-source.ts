import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const TypeOrmConfig: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: process.env.DB_PASSWORD,
    database: 'fitpage',
    entities: [__dirname + '../../entities/**/*.entity.{ts,js}'],
    migrations: [__dirname + '/../migrations/*.{ts,js}'], 
    synchronize: false, 
    logging: true,
};

const dataSource = new DataSource(TypeOrmConfig);
export default dataSource;  
