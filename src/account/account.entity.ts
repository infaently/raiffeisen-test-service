import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account', { schema: 'account' })
export class AccountEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'account_id' })
  accountId: number;

  @Column({ type: 'varchar', name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', name: 'last_name' })
  lastName: string;

  @Column({ type: 'float', name: 'balance' })
  balance: number;

  @Column({ type: 'date', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'date', name: 'updated_at' })
  updatedAt: Date;
}
