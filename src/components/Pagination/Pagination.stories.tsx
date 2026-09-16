import { useState } from 'react';
import { Pagination } from './Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
};

export default meta;

function PaginationDemo() {
  const [page, setPage] = useState(3);
  return <Pagination page={page} totalPages={10} onPageChange={setPage} />;
}

export const Default = {
  render: () => <PaginationDemo />,
};

export const FirstPage = {
  args: {
    page: 1,
    totalPages: 10,
    onPageChange: () => {},
  },
};

export const LastPage = {
  args: {
    page: 10,
    totalPages: 10,
    onPageChange: () => {},
  },
};
