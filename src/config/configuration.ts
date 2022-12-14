import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface HttpOptions {
  port: number;
}

export default (): { database: TypeOrmModuleOptions; http: HttpOptions } => ({
  database: {
    type: 'postgres',
    host: process.env['POSTGRES_HOST']!,
    port: +process.env['POSTGRES_PORT']!,
    username: process.env['POSTGRES_USER']!,
    password: process.env['POSTGRES_PASSWORD']!,
    database: process.env['POSTGRES_DB']!,
    entities: ['dist/**/*.entity.{ts,js}'],
    synchronize: false,
    migrationsTableName: 'migration',
    migrations: ['dist/migrations/*.ts'],
    migrationsRun: true,
  },
  http: {
    port: +process.env['HTTP_PORT'],
  },
});
