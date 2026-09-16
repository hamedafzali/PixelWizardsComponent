import { Accordion } from './Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
};

export default meta;

const items = [
  { id: 'a', title: 'What is PixelWizards?', content: 'A React + TypeScript component library.' },
  { id: 'b', title: 'Is it themeable?', content: 'Yes, including liquid-glass variants.' },
  { id: 'c', title: 'Disabled item', content: 'This content is unreachable.', disabled: true },
];

export const Default = {
  args: {
    items,
  },
};

export const AllowMultiple = {
  args: {
    items,
    allowMultiple: true,
    defaultOpenIds: ['a', 'b'],
  },
};
