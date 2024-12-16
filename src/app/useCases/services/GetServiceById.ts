import { Request, Response } from 'express';
import { AppDataSource } from '../../../../ormconfig.ts';
import Service from '../../models/Service.ts';

export const GetServiceById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const repository = AppDataSource.getRepository(Service);

  try {
    const service = await repository.findOne({
      where: { id: parseInt(id, 10) },
    });

    if (!service) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    return res.status(200).json(service);
  } catch (error) {
    console.error('Erro ao buscar o usuário:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};
