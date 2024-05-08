import { Body, Controller, Get, Post } from '@nestjs/common';

import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { CreateGroupRequestDto } from './dto/request/create-group.request.dto';
import { GroupService } from './services/group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @SkipAuth()
  @Post()
  public async createGroup(@Body() dto: CreateGroupRequestDto) {
    return await this.groupService.createGroup(dto);
  }

  // @Get()
  // findAll() {
  //   return this.groupService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.groupService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
  //   return this.groupService.update(+id, updateGroupDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.groupService.remove(+id);
}
