import { createConnection } from "typeorm";
import path from 'path';

export default async () => {
    await createConnection({
        type: 'mysql',
        host: 'remotemysql.com',
        port: 3306,
        username: 'WCnyUFmwmq',
        password: 'IhkfA1k2xk',
        database: 'WCnyUFmwmq',
        entities: [
            path.join(__dirname, '../entity/**/**.ts')
        ],
        synchronize: true,
    });

    console.log('db is connected');
}