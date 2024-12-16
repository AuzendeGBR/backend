import { Request, Response } from 'express';
import { AppDataSource } from '../../../../ormconfig.ts';
import Schedule from '../../models/Schedule.ts';

export const GetScheduleById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const scheduleRepository = AppDataSource.getRepository(Schedule);
  const scheduleId = parseInt(req.params.id);

  try {
    const schedule = await scheduleRepository.findOne({
      where: { id: scheduleId },
      relations: ['usuario', 'servico'],
    });

    if (!schedule) {
      return res.status(404).json({ error: 'Agendamento não encontrado.' });
    }

    return res.status(200).json(schedule);
  } catch (error) {
    console.error('Erro ao buscar agendamento:', error);
    return res.status(500).json({ error: 'Erro ao buscar o agendamento.' });
  }
};
