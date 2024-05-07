import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { OrderListRequestDto } from './dto/request/order-list.request.dto';
import { OrderResponseDto } from './dto/response/order.response.dto';
import { OrdersListResponseDto } from './dto/response/orders-list.response.dto';
import { OrdersService } from './services/orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // @Post()
  // create(@Body() createOrderDto: CreateOrderDto) {
  //   return this.ordersService.create(createOrderDto);
  // }

  @ApiOperation({ summary: 'Get all orders' })
  @ApiBearerAuth()
  @Get()
  public async getList(
    @Query() query: OrderListRequestDto,
    @CurrentUser() userData: IUserData,
  ): Promise<OrdersListResponseDto> {
    return await this.ordersService.getList(query);
  }

  @ApiOperation({ summary: 'Get one order by id' })
  //  @ApiBearerAuth()
  @SkipAuth()
  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<OrderResponseDto> {
    return await this.ordersService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.ordersService.update(+id, updateOrderDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ordersService.remove(+id);
  // }
}
