import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { OrderListRequestDto } from './dto/request/order-list.request.dto';
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
  @SkipAuth()
  @Get()
  public async getList(
    @Query() query: OrderListRequestDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<OrdersListResponseDto> {
    // console.log('req', req);
    // console.log('res', res);
    {
      return await this.ordersService.getList(query);
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //   return this.ordersService.findOne(+id);
    // }
    //
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
}
