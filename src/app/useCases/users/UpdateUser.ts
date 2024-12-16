import { Request, Response } from 'express';
import { AppDataSource } from '../../../../ormconfig.ts';
import User from '../../models/User.ts';

export const UpdateUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { nome_completo, email, celular, senha } = req.body; // Dados a serem atualizados
  const repository = AppDataSource.getRepository(User);

  try {
    const user = await repository.findOne({ where: { id: parseInt(id, 10) } });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    if (nome_completo) user.nome_completo = nome_completo;
    if (email) user.email = email;
    if (celular) user.celular = celular;
    if (senha) user.senha = senha;

    const updatedUser = await repository.save(user);

    return res.status(200).json({
      message: 'Usuário atualizado com sucesso.',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Erro ao atualizar o usuário:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};
