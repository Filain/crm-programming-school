import { GroupEntity } from '../../../database/entities/group.entity';
import { GroupRespounseDto } from '../dto/response/group.respounse.dto';
import { GroupListRespounseDto } from '../dto/response/group-list.respounse.dto';

export class GroupMapper {
  public static toResponseDto(entities: GroupEntity): GroupRespounseDto {
    return {
      group: entities.group,
    };
  }

  public static toResponseDtoList(
    entities: GroupEntity[],
  ): GroupListRespounseDto {
    return {
      groups: entities.map((entity) => entity.group),
    };
  }
}
