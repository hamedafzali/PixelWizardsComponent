import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;

export const Default = {
  args: {
    label: 'Enable live prices',
  },
};

export const Checked = {
  args: {
    label: 'Dark mode',
    defaultChecked: true,
  },
};

export const Disabled = {
  args: {
    label: 'Two-factor auth',
    disabled: true,
  },
};

export const WithHelperText = {
  args: {
    label: 'Email alerts',
    helperText: 'Get notified when a price target is hit',
  },
};
