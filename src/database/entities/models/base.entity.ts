import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @CreateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
