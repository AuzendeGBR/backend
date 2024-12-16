import { Request, Response } from 'express';
import { AppDataSource } from '../../../../ormconfig.ts';
import Schedule from '../../models/Schedule.ts';

export const RemoveSchedule = async (
  req: Request,
  res: Response
): Promise<any> => {
  const scheduleRepository = AppDataSource.getRepository(Schedule);
  const scheduleId = parseInt(req.params.id);

  try {
    const schedule = await scheduleRepository.findOne({
      where: { id: scheduleId },
    });

    if (!schedule) {
      return res.status(404).json({ error: 'Agendamento não encontrado.' });
    }

    await scheduleRepository.remove(schedule);

    return res
      .status(200)
      .json({ message: 'Agendamento excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir agendamento:', error);
    return res.status(500).json({ error: 'Erro ao excluir o agendamento.' });
  }
};
