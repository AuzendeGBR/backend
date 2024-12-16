import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1733752501128 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'usuarios',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nome_completo',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'sexo',
            type: 'enum',
            enum: ['MASCULINO', 'FEMININO'],
            isNullable: false,
          },
          {
            name: 'cpf',
            type: 'varchar',
            length: '14',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'celular',
            type: 'varchar',
            length: '15',
            isNullable: false,
          },
          {
            name: 'data_nascimento',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'senha',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'tipo',
            type: 'enum',
            enum: ['CLIENTE', 'ADMIN'],
            default: "'CLIENTE'",
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('usuarios');
  }
}
