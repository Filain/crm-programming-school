import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateGroupRequestDto } from './dto/request/create-group.request.dto';
import { GroupService } from './services/group.service';

@ApiTags('Groups')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @ApiOperation({ summary: 'Create group' })
  @ApiBearerAuth()
  // @SkipAuth()
  @Post()
  public async createGroup(@Body() dto: CreateGroupRequestDto) {
    return await this.groupService.createGroup(dto);
  }

  @ApiOperation({ summary: 'Get all groups' })
  @ApiBearerAuth()
  // @SkipAuth()
  @Get()
  public async getAllGroups() {
    return await this.groupService.getAllGroups();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.groupService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
  //   return this.groupService.update(+id, updateGroupDto);
  // }

  // @Delete(':id')
  // public remove(@Param('id') id: string) {
  //   return this.groupService.remove(+id);
  // }
}
