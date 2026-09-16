import Table, { TableData } from './Table';

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
};

export default meta;

const sampleData: TableData = {
  table: 'positions',
  columns: [
    { column_name: 'symbol', data_type: 'text', is_nullable: 'NO', column_default: null },
    { column_name: 'shares', data_type: 'integer', is_nullable: 'NO', column_default: null },
    { column_name: 'price', data_type: 'numeric', is_nullable: 'NO', column_default: null },
  ],
  data: [
    { symbol: 'AAPL', shares: 10, price: 189.42 },
    { symbol: 'MSFT', shares: 5, price: 402.11 },
    { symbol: 'TSLA', shares: 2, price: 248.5 },
  ],
  pagination: { page: 1, limit: 10, total: 3, totalPages: 1 },
};

export const Default = {
  args: {
    data: sampleData,
  },
};

export const Loading = {
  args: {
    data: sampleData,
    loading: true,
  },
};

export const ErrorState = {
  args: {
    data: sampleData,
    error: 'Failed to load positions',
  },
};

export const ZebraTheme = {
  args: {
    data: sampleData,
    theme: 'zebra',
  },
};
