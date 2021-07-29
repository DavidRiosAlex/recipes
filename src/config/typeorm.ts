import { createConnection } from "typeorm";
import path from 'path';

declare var process : {
    env: {
        SQL_DATABASE_HOST: string,
        SQL_DATABASE_PORT: number,
        SQL_DATABASE_USER: string,
        SQL_DATABASE_PASSWORD: string,
        SQL_DATABASE_NAME: string,
    }
}

const {
    SQL_DATABASE_HOST,
    SQL_DATABASE_PORT,
    SQL_DATABASE_USER,
    SQL_DATABASE_PASSWORD,
    SQL_DATABASE_NAME,
} = process.env;

export default async () => {
    await createConnection({
        type: 'mysql',
        host: SQL_DATABASE_HOST,
        port: SQL_DATABASE_PORT,
        username: SQL_DATABASE_USER,
        password: SQL_DATABASE_PASSWORD,
        database: SQL_DATABASE_NAME,
        entities: [
            path.join(__dirname, '../entity/**/**.ts')
        ],
        synchronize: true,
    });

    console.log('db is connected');
}