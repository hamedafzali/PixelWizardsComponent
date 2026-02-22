export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string | number | Array<string | number> | null;
  defaultValue?: string | number | Array<string | number>;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  className?: string;
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  searchable?: boolean;
  clearable?: boolean;
  loading?: boolean;
  multiple?: boolean;
  maxVisible?: number;
  onChange?: (
    value: string | number | Array<string | number> | null,
  ) => void;
  onSearch?: (query: string) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
}
