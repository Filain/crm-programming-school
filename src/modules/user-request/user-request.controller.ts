import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserRequestDto } from './dto/request/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/request/update-user-request.dto';
import { UserRequestService } from './user-request.service';

@ApiTags('User request')
@Controller('user-request')
export class UserRequestController {
  constructor(private readonly userRequestService: UserRequestService) {}

  @Post()
  create(@Body() createUserRequestDto: CreateUserRequestDto) {
    return this.userRequestService.create(createUserRequestDto);
  }

  @Get()
  findAll() {
    return this.userRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRequestService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserRequestDto: UpdateUserRequestDto,
  ) {
    return this.userRequestService.update(+id, updateUserRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRequestService.remove(+id);
  }
}
