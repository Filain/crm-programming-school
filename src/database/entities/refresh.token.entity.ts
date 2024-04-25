import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

import { ManagerEntity } from './manager.entity';
import { BaseEntity } from './models/base.entity';

@Entity('refresh_tokens')
export class RefreshTokenEntity extends BaseEntity {
  @Column('text')
  refreshToken: string;
  @Column()
  managerId: string;
  @OneToMany(() => ManagerEntity, (manager) => manager.refreshTokens)
  @JoinColumn({ name: 'managerId' })
  manager?: ManagerEntity;
}
