import { Request, Response } from 'express';
import { AppDataSource } from '../../../../ormconfig.ts';
import Schedule from '../../models/Schedule.ts';

export const UpdateSchedule = async (
  req: Request,
  res: Response
): Promise<any> => {
  const scheduleRepository = AppDataSource.getRepository(Schedule);
  const scheduleId = parseInt(req.params.id);
  const { usuarioId, servicoId, data_hora } = req.body;

  try {
    const schedule = await scheduleRepository.findOneBy({ id: scheduleId });

    if (!schedule) {
      return res.status(404).json({ error: 'Agendamento não encontrado.' });
    }

    if (usuarioId) schedule.usuario = usuarioId;
    if (servicoId) schedule.servico = servicoId;
    if (data_hora) schedule.data_hora = data_hora;

    await scheduleRepository.save(schedule);

    const updatedSchedule = await scheduleRepository.findOne({
      where: { id: scheduleId },
      relations: ['usuario', 'servico'],
    });

    return res.status(200).json(updatedSchedule);
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);
    return res.status(500).json({ error: 'Erro ao atualizar o agendamento.' });
  }
};
