import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { PingResolver } from './resolvers/ping';
import { ProductResolver } from './resolvers/productResolver';
import { buildSchema } from 'type-graphql';

const server = async () => {
    const app = express();
    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PingResolver, ProductResolver],
            validate: false,
        }),
        context: ({req, res}) => ({ req, res })
    });
    await server.start();
    server.applyMiddleware({ app, path: '/api' });
    return app
}

export default server;
