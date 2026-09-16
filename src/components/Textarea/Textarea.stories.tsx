import { Textarea } from './Textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'filled'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;

export const Default = {
  args: {
    label: 'Notes',
    placeholder: 'Add a note about this trade...',
  },
};

export const WithError = {
  args: {
    label: 'Description',
    error: 'Description is required',
  },
};

export const FullWidth = {
  args: {
    label: 'Comments',
    fullWidth: true,
  },
};
