import Select from './Select';

const meta = {
  title: 'Components/Select',
  component: Select,
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

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date', disabled: true },
];

export const Default = {
  args: {
    options,
    placeholder: 'Select a fruit',
  },
};

export const Searchable = {
  args: {
    options,
    searchable: true,
    clearable: true,
  },
};

export const Multiple = {
  args: {
    options,
    multiple: true,
    placeholder: 'Select fruits',
  },
};

export const WithError = {
  args: {
    options,
    error: true,
    helperText: 'Please choose a fruit',
  },
};

export const Loading = {
  args: {
    options,
    loading: true,
  },
};
