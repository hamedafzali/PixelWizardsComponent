import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    status: 'info',
    title: 'Information',
    children: 'This is an informational alert message.',
  },
};

export const Success: Story = {
  args: {
    status: 'success',
    title: 'Success',
    children: 'Your action was completed successfully!',
  },
};

export const Warning: Story = {
  args: {
    status: 'warning',
    title: 'Warning',
    children: 'Please be careful with this action.',
  },
};

export const Error: Story = {
  args: {
    status: 'error',
    title: 'Error',
    children: 'Something went wrong. Please try again.',
  },
};

export const Dismissable: Story = {
  render: () => {
    const [show, setShow] = useState(true);
    if (!show) return <button onClick={() => setShow(true)}>Show Alert</button>;
    return (
      <Alert
        status="info"
        title="Dismissable Alert"
        dismissable
        onClose={() => setShow(false)}
      >
        Click the X button to dismiss this alert.
      </Alert>
    );
  },
};

