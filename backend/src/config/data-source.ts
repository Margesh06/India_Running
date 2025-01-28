import { DataSource, DataSourceOptions } from 'typeorm';
console.log("fit"+__dirname);
export const TypeOrmConfig: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Mar@06032004',
    database: 'fitpage',
    entities: [__dirname + '../../entities/**/*.entity.{ts,js}'],
    migrations: [__dirname + '/../migrations/*.{ts,js}'], 
    synchronize: false, 
    logging: true,
};

const dataSource = new DataSource(TypeOrmConfig);
export default dataSource;  
