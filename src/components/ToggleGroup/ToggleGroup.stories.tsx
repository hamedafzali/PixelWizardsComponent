import { ToggleGroup } from './ToggleGroup';

const meta = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
};

export default meta;

const items = [
  { id: '1d', label: '1D' },
  { id: '1w', label: '1W' },
  { id: '1m', label: '1M' },
  { id: '1y', label: '1Y' },
];

export const Single = {
  args: {
    items,
    defaultValue: '1m',
  },
};

export const Multiple = {
  args: {
    items,
    multiple: true,
    defaultValue: ['1d', '1w'],
  },
};
