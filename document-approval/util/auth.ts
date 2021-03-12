import { sign, verify } from 'jsonwebtoken';
import { authUserInfo } from '../types/authUserInfo';

export const generateToken = (userInfo: authUserInfo): string => {
  return sign(userInfo, process.env.APP_SECRET as string);
};

export const verifyToken = (token: string | undefined) => {
  if (token === undefined) return null;
  const loginUserInfo = verify(token.slice(7), process.env.APP_SECRET as string);
  return loginUserInfo;
};
