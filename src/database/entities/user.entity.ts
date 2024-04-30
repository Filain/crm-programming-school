import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from './models/base.entity';
import { RefreshTokenEntity } from './refresh.token.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30 })
  name?: string;

  @Column({ type: 'varchar', unique: true, length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 10 })
  role: string;

  @OneToMany(() => RefreshTokenEntity, (refreshToken) => refreshToken.user)
  refreshTokens?: RefreshTokenEntity[];
}
