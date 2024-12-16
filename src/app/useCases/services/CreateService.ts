import { Request, Response } from 'express';
import { AppDataSource } from '../../../../ormconfig.ts';
import Service from '../../models/Service.ts';

export const CreateService = async (
  req: Request,
  res: Response
): Promise<any> => {
  const repository = AppDataSource.getRepository(Service);

  const { nome, descricao, preco } = req.body;

  try {
    if (!nome || !preco) {
      return res
        .status(400)
        .json({ error: 'Os campos nome e preco são obrigatórios.' });
    }

    const service = repository.create({ nome, descricao, preco });

    await repository.save(service);

    return res.status(201).json({
      message: 'Serviço criado com sucesso!',
      service: {
        id: service.id,
        nome: service.nome,
        descricao: service.descricao,
        preco: service.preco,
        createdAt: service.createdAt,
      },
    });
  } catch (error) {
    console.error('Erro ao criar serviço:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};
