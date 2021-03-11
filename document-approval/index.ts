import './generated/nexus';

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import schema from './resolver';
import { createContext } from './context';

const apollo = new ApolloServer({
  schema: schema,
  context: createContext(),
  introspection: true,
  playground: true,
});

const app = express();

apollo.applyMiddleware({ app });

app.listen(process.env.PORT, () => {
  console.log(`Document Server Start : PORT: ${process.env.PORT}`);
});
