import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from './models/base.entity';
import { OrderEntity } from './order.entity';

@Entity('comments')
export class CommentEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  comment: string;

  @Column()
  order_id: number;
  @ManyToOne(() => OrderEntity, (entity) => entity.comments)
  @JoinColumn({ name: 'order_id' })
  order?: OrderEntity;
}
