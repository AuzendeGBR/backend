import { Request, Response } from 'express';
import { AppDataSource } from '../../../../ormconfig.ts';
import User from '../../models/User.ts';

export const GetAllUsers = async (
  _req: Request,
  res: Response
): Promise<any> => {
  const repository = AppDataSource.getRepository(User);

  try {
    const users = await repository.find();

    if (users.length === 0) {
      return res.status(404).json({ message: 'Nenhum usuário encontrado.' });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};
