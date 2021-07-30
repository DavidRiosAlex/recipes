import 'reflect-metadata';
import server from './app';
import connect from './config/typeorm';

async function main(){
    await connect();
    const port = 3010;
    const app = await server();
    app.listen(port);
    console.log(`server is listening at port ${port}`);
};

main();