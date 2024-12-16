import { Request, Response } from 'express';
import { AppDataSource } from '../../../../ormconfig.ts';
import User from '../../models/User.ts';

export const CreateUser = async (req: Request, res: Response): Promise<any> => {
  const repository = AppDataSource.getRepository(User);

  const {
    nome_completo,
    sexo,
    cpf,
    celular,
    data_nascimento,
    email,
    senha,
    tipo,
  } = req.body;

  try {
    const userExists = await repository.findOne({
      where: [{ email }, { cpf }],
    });

    if (userExists) {
      return res
        .status(409)
        .json({ error: 'Usuário já existe com este email ou CPF.' });
    }

    const user = repository.create({
      nome_completo,
      sexo,
      cpf,
      celular,
      data_nascimento,
      email,
      senha,
      tipo,
    });

    await repository.save(user);

    return res.status(201).json({
      message: 'Usuário criado com sucesso.',
      user: {
        id: user.id,
        nome_completo: user.nome_completo,
        email: user.email,
        tipo: user.tipo,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar o usuário.' });
  }
};
