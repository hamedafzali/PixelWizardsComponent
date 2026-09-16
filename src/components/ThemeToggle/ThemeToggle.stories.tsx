import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const meta = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
};

export default meta;

function ThemeToggleDemo({ size }: { size?: 'sm' | 'md' | 'lg' }) {
  const [isDark, setIsDark] = useState(false);
  return <ThemeToggle size={size} isDark={isDark} onToggle={() => setIsDark((v) => !v)} />;
}

export const Default = {
  render: () => <ThemeToggleDemo />,
};

export const Small = {
  render: () => <ThemeToggleDemo size="sm" />,
};

export const Large = {
  render: () => <ThemeToggleDemo size="lg" />,
};
