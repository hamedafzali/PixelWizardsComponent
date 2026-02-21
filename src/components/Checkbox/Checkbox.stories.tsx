import React from "react";
import { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;

export const Default= {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked= {
  args: {
    label: 'I agree',
    defaultChecked: true,
  },
};

export const Indeterminate= {
  args: {
    label: 'Select all',
    indeterminate: true,
  },
};

export const Disabled= {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};

export const Sizes= {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox size="sm" label="Small checkbox" />
      <Checkbox size="md" label="Medium checkbox" />
      <Checkbox size="lg" label="Large checkbox" />
    </div>
  ),
};

