import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'glass'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;

export const Default= {
  args: {
    children: 'This is a default card with some content.',
    variant: 'default',
  },
};

export const Elevated= {
  args: {
    children: 'This is an elevated card with shadow.',
    variant: 'elevated',
  },
};

export const Outlined= {
  args: {
    children: 'This is an outlined card with border.',
    variant: 'outlined',
  },
};

export const Glass= {
  args: {
    children: 'This is a glass morphism card.',
    variant: 'glass',
  },
};

export const WithPadding= {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Card padding="sm">Small padding</Card>
      <Card padding="md">Medium padding</Card>
      <Card padding="lg">Large padding</Card>
      <Card padding="xl">X-Large padding</Card>
    </div>
  ),
};

export const WithHover= {
  args: {
    children: 'Hover over this card to see the effect.',
    hover: true,
  },
};

