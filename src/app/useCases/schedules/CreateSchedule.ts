import { Request, Response } from 'express';
import { AppDataSource } from '../../../../ormconfig.ts';
import Schedule from '../../models/Schedule.ts';
import Service from '../../models/Service.ts';
import User from '../../models/User.ts';

export const CreateSchedule = async (
  req: Request,
  res: Response
): Promise<any> => {
  const agendamentoRepository = AppDataSource.getRepository(Schedule);
  const userRepository = AppDataSource.getRepository(User);
  const serviceRepository = AppDataSource.getRepository(Service);

  const { usuarioId, servicoId, data_hora } = req.body;

  try {
    const usuario = await userRepository.findOne({
      where: { id: usuarioId },
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const servico = await serviceRepository.findOne({
      where: { id: servicoId },
    });

    if (!servico) {
      return res.status(404).json({ error: 'Serviço não encontrado.' });
    }

    const agendamento = agendamentoRepository.create({
      usuario,
      servico,
      data_hora,
    });

    await agendamentoRepository.save(agendamento);

    return res.status(201).json({
      message: 'Agendamento criado com sucesso.',
      agendamento: {
        id: agendamento.id,
        data_hora: agendamento.data_hora,
        usuario: {
          id: agendamento.usuario.id,
          nome_completo: agendamento.usuario.nome_completo,
          email: agendamento.usuario.email,
          celular: agendamento.usuario.celular,
          tipo: agendamento.usuario.tipo,
        },
        servico: {
          id: agendamento.servico.id,
          nome: agendamento.servico.nome,
          descricao: agendamento.servico.descricao,
          preco: agendamento.servico.preco,
        },
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar o agendamento.' });
  }
};
