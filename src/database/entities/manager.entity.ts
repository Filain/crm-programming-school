import { Column, Entity, OneToMany } from 'typeorm';

import { ERole } from '../../common/enums/role.enum';
import { BaseEntity } from './models/base.entity';
import { RefreshTokenEntity } from './refresh.token.entity';

@Entity('managers')
export class ManagerEntity extends BaseEntity {
  @Column('text')
  name?: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column({ type: 'enum', enum: ERole })
  role: ERole;

  @OneToMany(() => RefreshTokenEntity, (refreshToken) => refreshToken.manager)
  refreshTokens?: RefreshTokenEntity[];
}
