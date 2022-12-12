import { Controller, Get, Param } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':accountId')
  async getAccountById(@Param('accountId') accountId: string): Promise<string> {
    return 'Hello world';
  }
}
