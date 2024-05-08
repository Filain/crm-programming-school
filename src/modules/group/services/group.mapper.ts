import { GroupEntity } from '../../../database/entities/group.entity';
import { GroupRespounseDto } from '../dto/response/group.respounse.dto';

export class GroupMapper {
  public static toResponseDto(entities: GroupEntity[]): GroupRespounseDto {
    return {
      group: entities.map((entity) => entity.group),
    };
  }
}
