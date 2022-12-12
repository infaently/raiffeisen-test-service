import {
  BadRequestException,
  Controller,
  Header,
  Param,
  Post,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  // @Post('/transfer/:accountIdFrom/:accountIdTo')
  @Post('/transfer/:sourceAccountId/:targetAccountId')
  @Header('content-type', 'application/json')
  async transferBalance(
    @Param('sourceAccountId') accountIdFrom: number,
    @Param('targetAccountId') accountIdTo: number,
  ) {
    // Such problem with validating like in account controller
    if (accountIdFrom < 1 || accountIdTo < 1) {
      throw new BadRequestException(
        `Both of accounts ids should be greater then 0`,
      );
    }

    if (accountIdFrom === accountIdTo) {
      throw new BadRequestException(`Account can't be equivalent`);
    }

    const result = await this.transactionService.transferBalance(
      accountIdFrom,
      accountIdTo,
    );

    return result;
  }
}
