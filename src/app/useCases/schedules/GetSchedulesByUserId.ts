import { Request, Response } from 'express';
import { AppDataSource } from '../../../../ormconfig.ts';
import Schedule from '../../models/Schedule.ts';
import User from '../../models/User.ts';

export const GetSchedulesByUserId = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userRepository = AppDataSource.getRepository(User);
  const scheduleRepository = AppDataSource.getRepository(Schedule);
  const userId = parseInt(req.params.userId);

  try {
    const user = await userRepository.findOne({ where: { id: userId } });

    if (user) {
      const schedules = await scheduleRepository.find({
        where: { usuario: user },
        relations: ['usuario', 'servico'],
      });

      if (!schedules) {
        return res.status(404).json({ error: 'Agendamento não encontrado.' });
      }

      return res.status(200).json(schedules);
    }
  } catch (error) {
    console.error('Erro ao buscar agendamento:', error);
    return res.status(500).json({ error: 'Erro ao buscar o agendamento.' });
  }
};
