import { DataSource, DataSourceOptions } from 'typeorm';
import configuration from './configuration';
import * as dotenv from 'dotenv';

dotenv.config();

const database = configuration().database as DataSourceOptions;

export const AppDataSource = new DataSource(database);
