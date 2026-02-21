import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
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
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: 'This is a default card with some content.',
    variant: 'default',
  },
};

export const Elevated: Story = {
  args: {
    children: 'This is an elevated card with shadow.',
    variant: 'elevated',
  },
};

export const Outlined: Story = {
  args: {
    children: 'This is an outlined card with border.',
    variant: 'outlined',
  },
};

export const Glass: Story = {
  args: {
    children: 'This is a glass morphism card.',
    variant: 'glass',
  },
};

export const WithPadding: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Card padding="sm">Small padding</Card>
      <Card padding="md">Medium padding</Card>
      <Card padding="lg">Large padding</Card>
      <Card padding="xl">X-Large padding</Card>
    </div>
  ),
};

export const WithHover: Story = {
  args: {
    children: 'Hover over this card to see the effect.',
    hover: true,
  },
};

