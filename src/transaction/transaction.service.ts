import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import { AccountEntity } from '../account/account.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    @InjectRepository(TransactionEntity)
    private readonly transactionRepostory: Repository<TransactionEntity>,
  ) {}

  async transferBalance(accountIdFrom: number, accountIdTo: number) {
    // TODO needs transaction
    const accountFrom = await this.accountRepository.findOne({
      where: { accountId: accountIdFrom },
    });

    if (!accountFrom) {
      throw new NotFoundException('Source account not found');
    }

    if (!accountFrom?.balance) {
      throw new InternalServerErrorException(`Nothing to transfer`);
    }

    const amount = accountFrom.balance;

    const accountTo = await this.accountRepository.findOne({
      where: { accountId: accountIdTo },
    });

    if (!accountTo) {
      throw new NotFoundException('Target account not found');
    }

    await Promise.all([
      this.accountRepository
        .createQueryBuilder('account')
        .update(AccountEntity)
        .whereInIds(accountFrom)
        .set({ balance: 0, updatedAt: new Date() })
        .execute(),
      this.accountRepository
        .createQueryBuilder('account')
        .update(AccountEntity)
        .whereInIds(accountTo)
        .set({ balance: accountTo.balance + amount })
        .execute(),
      this.transactionRepostory.save({
        accountIdFrom: accountFrom.accountId,
        accountIdTo: accountTo.accountId,
        amount,
      }),
    ]);

    return { amount };
  }
}
