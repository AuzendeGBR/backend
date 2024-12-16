import { Request, Response } from 'express';
import { AppDataSource } from '../../../../ormconfig.ts';
import Service from '../../models/Service.ts';

export const GetAllServices = async (
  _req: Request,
  res: Response
): Promise<any> => {
  try {
    const repository = AppDataSource.getRepository(Service);

    const services = await repository.find();

    return res.status(200).json(services);
  } catch (error) {
    console.error('Erro ao buscar serviços:', error);

    return res.status(500).json({ error: 'Erro ao buscar os serviços.' });
  }
};
