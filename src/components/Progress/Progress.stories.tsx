import React from "react";
import { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'striped', 'gradient'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
    },
  },
};

export default meta;

export const Default= {
  args: {
    value: 50,
  },
};

export const WithLabel= {
  args: {
    value: 75,
    showLabel: true,
  },
};

export const Colors= {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      <Progress value={60} color="primary" showLabel />
      <Progress value={70} color="success" showLabel />
      <Progress value={50} color="warning" showLabel />
      <Progress value={40} color="error" showLabel />
      <Progress value={65} color="info" showLabel />
    </div>
  ),
};

export const Variants= {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      <Progress value={60} variant="default" showLabel />
      <Progress value={60} variant="striped" showLabel />
      <Progress value={60} variant="gradient" showLabel />
    </div>
  ),
};

export const Sizes= {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      <Progress value={60} size="sm" showLabel />
      <Progress value={60} size="md" showLabel />
      <Progress value={60} size="lg" showLabel />
    </div>
  ),
};

export const Animated= {
  args: {
    value: 75,
    animated: true,
    showLabel: true,
  },
};

