import { Popover } from './Popover';
import { Button } from '../Button';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  args: {
    trigger: <Button variant="secondary">Show Info</Button>,
    content: <div style={{ padding: '0.5rem' }}>This chart shows the 30-day trend.</div>,
  },
};
