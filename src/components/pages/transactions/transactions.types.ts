import { Transaction } from '../../../lib/types/types';
export type DropdownArray = {
  name: string;
  description: string;
};

export type TransactionDropdownProps = {
  currentSort: string;
  setSort: (sort: string) => void;
  dropdownarray: DropdownArray[];
};

export type TransactionItemProps = {
  transaction: Transaction;
};

export type TransactionListProps = {
  transactions: Transaction[];
};

export type TransactionTableProps = {
  currentTableData: Transaction[];
};
