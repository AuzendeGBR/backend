import { Request, Response } from 'express';
import { AppDataSource } from '../../../../ormconfig.ts';
import Service from '../../models/Service.ts';

export const UpdateService = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const { nome, descricao, preco } = req.body;
  const repository = AppDataSource.getRepository(Service);

  try {
    // Verifica se o serviço existe
    const service = await repository.findOne({
      where: { id: parseInt(id, 10) },
    }); // Ou o método que você utiliza com seu ORM
    if (!service) {
      return res.status(404).send({ message: 'Serviço não encontrado.' });
    }

    if (nome) service.nome = nome;
    if (descricao) service.descricao = descricao;
    if (preco) service.preco = preco;

    const updatedService = await repository.save(service);

    return res.status(200).send({
      message: 'Serviço atualizado com sucesso  ',
      servico: updatedService,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro ao atualizar o serviço.' });
  }
};
