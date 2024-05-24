import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { OrderFilterRequestDto } from './dto/request/order-filter.request.dto';
import { OrderListRequestDto } from './dto/request/order-list.request.dto';
import { OrderUpdateRequestDto } from './dto/request/order-update.request.dto';
import { OrderResponseDto } from './dto/response/order.response.dto';
import { OrdersResponseDto } from './dto/response/orders.response.dto';
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

  @ApiOperation({ summary: 'Get filtered orders' })
  @ApiBearerAuth()
  @Get('filtered')
  public async findAllFiltered(
    @Query() query: OrderFilterRequestDto,
  ): Promise<OrdersListResponseDto> {
    return await this.ordersService.findAllFiltered(query);
  }

  @ApiOperation({ summary: 'Get my filtered orders' })
  @ApiBearerAuth()
  @Get('my-filtered')
  public async findMylFiltered(
    @Query() query: OrderFilterRequestDto,
    @CurrentUser() userData: IUserData,
  ): Promise<OrdersListResponseDto> {
    return await this.ordersService.findMylFiltered(query, userData);
  }

  @ApiOperation({ summary: 'Get one order by id' })
  @ApiBearerAuth()
  // @SkipAuth()
  @Get(':order_id')
  public async findOne(
    @Param('order_id') order_id: string,
  ): Promise<OrderResponseDto> {
    return await this.ordersService.findOne(order_id);
  }

  @ApiOperation({ summary: 'Edit order by id' })
  @ApiBearerAuth()
  @Put(':order_id')
  public async update(
    @Param('order_id') order_id: string,
    @Body() updateOrderDto: OrderUpdateRequestDto,
    @CurrentUser() userData: IUserData,
  ): Promise<OrdersResponseDto> {
    return await this.ordersService.update(+order_id, updateOrderDto, userData);
  }

  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ordersService.remove(+id);
  // }
}
