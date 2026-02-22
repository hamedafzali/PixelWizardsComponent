import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'outline', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;

export const Primary= {
  args: {
    children: 'Button',
    variant: 'primary',
  },
};

export const Secondary= {
  args: {
    children: 'Button',
    variant: 'secondary',
  },
};

export const Outline= {
  args: {
    children: 'Button',
    variant: 'outline',
  },
};

export const Ghost= {
  args: {
    children: 'Button',
    variant: 'ghost',
  },
};

export const Danger= {
  args: {
    children: 'Button',
    variant: 'danger',
  },
};

export const Sizes= {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">X-Large</Button>
    </div>
  ),
};

export const Loading= {
  args: {
    children: 'Loading...',
    loading: true,
  },
};

export const Disabled= {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

export const FullWidth= {
  args: {
    children: 'Full Width Button',
    fullWidth: true,
  },
};

