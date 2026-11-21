import { RecurringBill } from './types/types';

const DAY_MS = 24 * 60 * 60 * 1000;
const DUE_SOON_DAYS = 5;

export type BillTiming = 'paid' | 'due' | 'upcoming';

function dueDay(bill: RecurringBill) {
  return new Date(bill.date ?? bill.orderDate).getDate();
}

/** This month's due date. A day past the month's length falls on the last day. */
function occurrenceThisMonth(bill: RecurringBill, now: Date) {
  const year = now.getFullYear();
  const month = now.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();
  return new Date(year, month, Math.min(dueDay(bill), lastDay));
}

export function billTiming(bill: RecurringBill, now = new Date()): BillTiming {
  const status = bill.status?.toLowerCase() ?? '';
  if (status === 'paid') return 'paid';
  if (status === 'due' || status === 'due soon') return 'due';

  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const due = occurrenceThisMonth(bill, now);
  const days = Math.round((due.getTime() - start.getTime()) / DAY_MS);

  if (days < 0) return 'paid';
  if (days <= DUE_SOON_DAYS) return 'due';
  return 'upcoming';
}
