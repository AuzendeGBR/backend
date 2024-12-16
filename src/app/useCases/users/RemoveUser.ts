import { Request, Response } from 'express';
import { AppDataSource } from '../../../../ormconfig.ts';
import User from '../../models/User.ts';

export const RemoveUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const repository = AppDataSource.getRepository(User);

  try {
    const user = await repository.findOne({ where: { id: parseInt(id, 10) } });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    await repository.remove(user);

    return res.status(200).json({ message: 'Usuário removido com sucesso.' });
  } catch (error) {
    console.error('Erro ao remover o usuário:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};
