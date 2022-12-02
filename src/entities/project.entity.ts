import { Entity, Column, ManyToOne, } from 'typeorm';
import Model from './model.entity';
import { User } from './user.entity';

@Entity('projects')
export class Project extends Model {
  @Column()
  title: string;

  @Column()
  zip_code: number;

  @Column()
  cost: number;

  @Column({ default: false })
  done: boolean;

  @Column({type: 'timestamptz'})
  deadline: Date;

  @Column()
  username: string;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;
}
