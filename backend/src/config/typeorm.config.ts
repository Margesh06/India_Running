import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Mar@06032004',
    database: 'fitpage',
    entities: [__dirname + '/entities/**/*.entity.{ts,js}'],
    migrations: [__dirname + '/../migrations/*.{ts,js}'], 
    synchronize: false, 
    logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
