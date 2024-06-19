export enum TransactionType {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
}

export type Transaction = {
  _id: string;
  amount: number;
  type: TransactionType;
  description?: string;
  createdAt: string;
};
