import { AppDataSource } from '../../ormconfig.ts';

AppDataSource.initialize()
  .then(() => {
    console.log('Conexão bem sucedida com o banco de dados 🏦🎲');
  })
  .catch((error) => {
    console.error('Erro ao conectar no banco de dados ❌', error);
  });
