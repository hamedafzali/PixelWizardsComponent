import { DropdownMenu } from './DropdownMenu';

const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  args: {
    label: 'Actions',
    items: [
      { label: 'Edit', onClick: () => {} },
      { label: 'Duplicate', onClick: () => {} },
      { label: 'Delete', onClick: () => {}, disabled: true },
    ],
  },
};

export const AlignRight = {
  args: {
    label: 'Options',
    align: 'right',
    items: [
      { label: 'Export CSV', onClick: () => {} },
      { label: 'Export JSON', onClick: () => {} },
    ],
  },
};
