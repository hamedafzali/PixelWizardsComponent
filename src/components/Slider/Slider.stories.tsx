import { Slider } from './Slider';

const meta = {
  title: 'Components/Slider',
  component: Slider,
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
    label: 'Position size',
    min: 0,
    max: 100,
    defaultValue: 50,
  },
};

export const WithHelperText = {
  args: {
    label: 'Risk tolerance',
    min: 0,
    max: 10,
    defaultValue: 4,
    helperText: 'Higher values allow larger drawdowns',
  },
};
