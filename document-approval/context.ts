import { PrismaClient } from '@prisma/client';
import { ApolloServerExpressConfig, ExpressContext } from 'apollo-server-express';
import { authUserInfo } from './types/authUserInfo';

const prisma = new PrismaClient();

export type Context = {
  prisma: PrismaClient;
  userInfo?: authUserInfo;
};

export const createContext = ({ req, res }: ExpressContext): Context => {
  console.log(req.headers.authorization);
  return { prisma };
};
