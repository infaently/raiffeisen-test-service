import {
  BadRequestException,
  Controller,
  Get,
  Header,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':accountId')
  @Header('content-type', 'application/json')
  async getAccountById(@Param('accountId') accountId: number) {
    // don't know how to validate using dto or something
    if (accountId < 1) {
      throw new BadRequestException(`Account id should be greater then 0`);
    }

    const result = await this.accountService.getAccount(accountId);

    if (!result) {
      throw new NotFoundException(`Account with id [${accountId}] not found`);
    }

    const balance = +result.balance.toFixed(2);

    return { balance };
  }
}
