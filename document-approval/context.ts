import { PrismaClient } from '@prisma/client';
import { ExpressContext } from 'apollo-server-express';
import { authUserInfo } from './types/authUserInfo';
import { verifyToken } from './util/auth';

const prisma = new PrismaClient();

export type Context = {
  prisma: PrismaClient;
  userInfo?: any;
};

export const createContext = ({ req, res }: ExpressContext): Context => {
  const userInfo = verifyToken(req.headers.authorization);
  // console.log(req.headers.authorization);
  return { prisma, userInfo };
};
