import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CommentEntity } from './comment.entity';
import { RefreshTokenEntity } from './refresh.token.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column({ type: 'varchar', length: 25, nullable: true })
  name?: string;
  @Column({ type: 'varchar', length: 25, nullable: true })
  surname?: string;
  @Column({ type: 'varchar', length: 100, nullable: true })
  email?: string;
  @Column({ type: 'varchar', length: 12, nullable: true })
  phone?: string;
  @Column({ type: 'int', nullable: true })
  age?: number;
  @Column({ type: 'varchar', length: 10, nullable: true })
  course?: string;
  @Column({ type: 'varchar', length: 15, nullable: true })
  course_format?: string;
  @Column({ type: 'varchar', length: 100, nullable: true })
  course_type?: string;
  @Column({ type: 'int', nullable: true })
  sum?: number;
  @Column({ type: 'int', nullable: true })
  alreadyPaid?: number;
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at?: Date;
  @Column({ type: 'varchar', length: 100, nullable: true })
  utm?: string;
  @Column({ type: 'varchar', length: 100, nullable: true })
  msg?: string;
  @Column({ type: 'varchar', length: 15, nullable: true })
  status?: string;
  @Column({ type: 'varchar', length: 15, nullable: true })
  manager?: string;
  @Column({ type: 'varchar', length: 15, nullable: true })
  group?: string;

  @OneToMany(() => CommentEntity, (comment) => comment.order)
  comments?: CommentEntity[];
}
