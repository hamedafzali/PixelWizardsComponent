import { DatePicker } from './DatePicker';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'filled'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;

export const Default = {
  args: {
    label: 'Start date',
  },
};

export const WithError = {
  args: {
    label: 'Expiry date',
    error: 'Expiry date must be in the future',
  },
};

export const FullWidth = {
  args: {
    label: 'Trade date',
    fullWidth: true,
  },
};
