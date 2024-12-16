import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Schedule from './Schedule.ts';

@Entity('servicos')
class Service {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  nome!: string;

  @Column({ type: 'text', nullable: true })
  descricao?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  preco!: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany('Service', 'agendamento')
  agendamentos!: Schedule[];
}

export default Service;
