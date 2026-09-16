import type { ComponentType } from 'react';
import MultiThemeToggle from './MultiThemeToggle';
import { MultiThemeProvider } from '../../themes/MultiThemeProvider';

const meta = {
  title: 'Components/MultiThemeToggle',
  component: MultiThemeToggle,
  tags: ['autodocs'],
  decorators: [
    (Story: ComponentType) => (
      <MultiThemeProvider defaultTheme="light">
        <Story />
      </MultiThemeProvider>
    ),
  ],
};

export default meta;

export const Default = {
  args: {},
};

export const Small = {
  args: {
    size: 'sm',
  },
};

export const Large = {
  args: {
    size: 'lg',
  },
};
