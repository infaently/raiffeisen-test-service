import { Controller, Get, Param } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':accountId')
  async getAccountById(@Param('accountId') accountId: string): Promise<string> {
    // eslint-disable-next-line
    /*[o_O]*/console.log(`11: accountId:`, accountId);
    return 'Hello world';
  }
}
