import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class OrderEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column({ type: 'varchar', length: 25 })
  name: string;
  @Column({ type: 'varchar', length: 25 })
  surname: string;
  @Column({ type: 'varchar', length: 100 })
  email: string;
  @Column({ type: 'varchar', length: 12 })
  phone: string;
  @Column({ type: 'int' })
  age: number;
  @Column({ type: 'varchar', length: 10 })
  course: string;
  @Column({ type: 'varchar', length: 15 })
  course_format: string;
  @Column({ type: 'varchar', length: 100 })
  course_type: string;
  @Column({ type: 'int' })
  sum: number;
  @Column({ type: 'int' })
  alreadyPaid: number;
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @Column({ type: 'varchar', length: 100 })
  utm: string;
  @Column({ type: 'varchar', length: 100 })
  msg: string;
  @Column({ type: 'varchar', length: 15 })
  status: string;
}
