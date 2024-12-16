import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../../../../ormconfig.ts';
import { env } from '../../config/env.ts';
import User from '../../models/User.ts';

const validatePassword = async (senha: string, hash: string) => {
  return bcrypt.compare(senha, hash);
};

const generateToken = (userId: number, tipo: string) => {
  return jwt.sign({ id: userId, tipo }, `${env.secretKey}`, {
    expiresIn: '7d',
  });
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const repository = AppDataSource.getRepository(User);
  const { email, senha } = req.body;

  try {
    const user = await repository.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const isValidPassword = await validatePassword(senha, user.senha);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    const token = generateToken(user.id, user.tipo);

    return res.json({
      user: {
        id: user.id,
        nome_completo: user.nome_completo,
        email: user.email,
        tipo: user.tipo,
      },
      token,
    });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
