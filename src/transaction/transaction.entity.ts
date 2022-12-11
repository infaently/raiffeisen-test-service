import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transaction', { schema: 'account' })
export class TransactionEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'transaction_id' })
  transactionId: number;

  @Column({ type: 'float' })
  amount: number;

  @Column({ type: 'date', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'integer', name: 'account_id_from' })
  accountIdFrom: number;

  @Column({ type: 'integer', name: 'account_id_to' })
  accountIdTo: number;
}
