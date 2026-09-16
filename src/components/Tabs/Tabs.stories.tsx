import { Tabs } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;

const tabs = [
  { id: 'overview', label: 'Overview', content: <p>Portfolio overview content.</p> },
  { id: 'positions', label: 'Positions', content: <p>Open positions content.</p> },
  { id: 'history', label: 'History', content: <p>Trade history content.</p>, disabled: true },
];

export const Default = {
  args: {
    tabs,
    defaultValue: 'overview',
  },
};
