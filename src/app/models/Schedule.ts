import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Service from './Service.ts';
import User from './User.ts';

@Entity('agendamentos')
class Schedule {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'timestamp' })
  data_hora!: Date;

  @ManyToOne('User', 'agendamentos')
  usuario!: User;

  @ManyToOne('Service', 'agendamentos')
  servico!: Service;
}

export default Schedule;
