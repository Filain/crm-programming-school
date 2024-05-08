import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';

import { GroupRepository } from '../../repository/services/group.repository';
import { CreateGroupRequestDto } from '../dto/request/create-group.request.dto';
import { GroupRespounseDto } from '../dto/response/group.respounse.dto';
import { GroupMapper } from './group.mapper';

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}
  public async createGroup(dto: CreateGroupRequestDto) {
    const gropsArray = dto.group;
    const groupEntity = await this.groupRepository.find();
    if (groupEntity.length === 0) {
      throw new Error('Group already exists');
    }
    const groupNameFromDB = new Set(groupEntity.map((group) => group.group));
    const newGroupName = gropsArray.filter(
      (group) => !groupNameFromDB.has(group),
    );
    const newGrroups = await this.groupRepository.save(
      newGroupName.map((group) => this.groupRepository.create({ group })),
    );
    return GroupMapper.toResponseDto(newGrroups);
  }
}

// findAll() {
//   return `This action returns all group`;
// }

// findOne(id: number) {
//   return `This action returns a #${id} group`;
// }
//
// update(id: number, updateGroupDto: ) {
//   return `This action updates a #${id} group`;
// }
//
// remove(id: number) {
//   return `This action removes a #${id} group`;
// }
