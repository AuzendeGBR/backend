import { Request, Response } from 'express';
import { AppDataSource } from '../../../../ormconfig.ts';
import Schedule from '../../models/Schedule.ts';

export const GetAllSchedules = async (
  _req: Request,
  res: Response
): Promise<any> => {
  try {
    const repository = AppDataSource.getRepository(Schedule);

    const schedules = await repository.find({
      relations: ['usuario', 'servico'],
    });

    const formattedSchedules = schedules.map((schedule) => ({
      id: schedule.id,
      data_hora: schedule.data_hora,
      usuario: {
        id: schedule.usuario.id,
        nome_completo: schedule.usuario.nome_completo,
        email: schedule.usuario.email,
        celular: schedule.usuario.celular,
        tipo: schedule.usuario.tipo,
      },
      servico: {
        id: schedule.servico.id,
        nome: schedule.servico.nome,
        descricao: schedule.servico.descricao,
        preco: schedule.servico.preco,
      },
    }));

    return res.status(200).json(formattedSchedules);
  } catch (error) {
    console.error('Erro ao buscar serviços:', error);

    return res.status(500).json({ error: 'Erro ao buscar os serviços.' });
  }
};
