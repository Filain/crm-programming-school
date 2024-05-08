import { HttpStatus, Injectable } from '@nestjs/common';

import { GroupRepository } from '../../repository/services/group.repository';
import { CreateGroupRequestDto } from '../dto/request/create-group.request.dto';
import { GroupListRespounseDto } from '../dto/response/group-list.respounse.dto';
import { GroupMapper } from './group.mapper';

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}
  public async createGroup(dto: CreateGroupRequestDto) {
    const existingGroup = await this.groupRepository.findOneBy({
      group: dto.group,
    });
    if (existingGroup) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Group already exists',
      };
    }
    const newGrroups = await this.groupRepository.save(
      this.groupRepository.create({ group: dto.group }),
    );
    return GroupMapper.toResponseDto(newGrroups);
  }

  public async getAllGroups(): Promise<GroupListRespounseDto> {
    const groups = await this.groupRepository.find();
    return GroupMapper.toResponseDtoList(groups);
  }
}

// findOne(id: number) {
//   return `This action returns a #${id} group`;
// }
//
// update(id: number, updateGroupDto: ) {
//   return `This action updates a #${id} group`;
// }

// remove(id: number) {
//   return `This action removes a #${id} group`;
