import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateSchedulesTable1733952924246 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'agendamentos',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'data_hora',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'usuarioId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'servicoId',
            type: 'int',
            isNullable: false,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'agendamentos',
      new TableForeignKey({
        columnNames: ['usuarioId'],
        referencedTableName: 'usuarios',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'agendamentos',
      new TableForeignKey({
        columnNames: ['servicoId'],
        referencedTableName: 'servicos',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('agendamentos', 'usuarioId');
    await queryRunner.dropForeignKey('agendamentos', 'servicoId');

    await queryRunner.dropTable('agendamentos');
  }
}
