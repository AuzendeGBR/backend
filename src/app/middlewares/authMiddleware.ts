import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from '../config/env.ts';

export interface ICustomRequest extends Request {
  token: string | JwtPayload;
}

const getTokenFrom = (request: Request) => {
  const authorization = request.headers.authorization;
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
  tipo?: string
): any | Promise<void> => {
  const token = getTokenFrom(req);

  if (!token) {
    return res.status(401).send({ error: 'token não fornecido' });
  }

  const decoded = jwt.verify(token, `${env.secretKey}`) as { tipo?: string };

  if (tipo && decoded.tipo !== tipo) {
    return res
      .status(403)
      .send({ error: `Não autorizado, você não é ${tipo}` });
  }

  (req as ICustomRequest).token = decoded;
  return next();
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
  authMiddleware(req, res, next);
};

export const authAdmin = (req: Request, res: Response, next: NextFunction) => {
  authMiddleware(req, res, next, 'ADMIN');
};
