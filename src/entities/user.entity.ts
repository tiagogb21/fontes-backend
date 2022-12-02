import {
  Entity,
  Column,
  Index,
  BeforeInsert,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import bcrypt from 'bcryptjs';
import { Project } from './project.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  toJSON() {
    return { ...this, password: undefined, verified: undefined };
  }
}
