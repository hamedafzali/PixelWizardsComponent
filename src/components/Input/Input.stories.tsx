import React from "react";
import { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined'],
    },
  },
};

export default meta;

export const Default= {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
};

export const WithError= {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    error: 'This field is required',
  },
};

export const WithHelper= {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    helper: 'Must be at least 8 characters',
    type: 'password',
  },
};

export const Required= {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    required: true,
  },
};

export const Disabled= {
  args: {
    label: 'Disabled Input',
    placeholder: 'This is disabled',
    disabled: true,
  },
};

export const Sizes= {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
      <Input size="sm" label="Small" placeholder="Small input" />
      <Input size="md" label="Medium" placeholder="Medium input" />
      <Input size="lg" label="Large" placeholder="Large input" />
    </div>
  ),
};

