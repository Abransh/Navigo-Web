import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'navigo',
  
  // Automatically load entities from all directories
  entities: [
    path.join(__dirname, '..', '**', 'entities', '*.entity{.ts,.js}')
  ],
  
  // Migrations configuration
  migrations: [
    path.join(__dirname, '..', 'migrations', '*{.ts,.js}')
  ],
  
  // Synchronize should be false in production
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV !== 'production',
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;