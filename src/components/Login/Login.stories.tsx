import type { Meta, StoryObj } from '@storybook/react';
import { Login } from './Login';

const meta: Meta<typeof Login> = {
  title: 'Components/Login',
  component: Login,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Login>;

export const Default: Story = {
  args: {
    onSubmit: (values) => {
      console.log('Login submitted:', values);
      alert(`Login: ${values.username} / ${values.password}`);
    },
  },
};

export const WithError: Story = {
  args: {
    error: 'Invalid username or password',
    onSubmit: (values) => {
      console.log('Login submitted:', values);
    },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    onSubmit: (values) => {
      console.log('Login submitted:', values);
    },
  },
};

