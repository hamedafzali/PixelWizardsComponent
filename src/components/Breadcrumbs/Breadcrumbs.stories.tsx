import { Breadcrumbs } from './Breadcrumbs';

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Dashboards', href: '#' },
      { label: 'Market Overview' },
    ],
  },
};

export const CustomSeparator = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Settings', href: '#' },
      { label: 'Theme' },
    ],
    separator: '→',
  },
};
