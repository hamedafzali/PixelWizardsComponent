import { useState } from 'react';
import { Radio, RadioGroup } from './Radio';

const meta = {
  title: 'Components/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
};

export default meta;

const options = [
  { label: 'Market order', value: 'market' },
  { label: 'Limit order', value: 'limit' },
  { label: 'Stop order', value: 'stop', disabled: true },
];

function RadioGroupDemo() {
  const [value, setValue] = useState('market');
  return <RadioGroup name="order-type" options={options} value={value} onChange={setValue} />;
}

export const Group = {
  render: () => <RadioGroupDemo />,
};

export const SingleRadio = {
  render: () => <Radio name="single" label="Enable notifications" />,
};
