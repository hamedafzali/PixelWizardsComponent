import { useState } from 'react';
import { CommandPalette, useCommandPaletteShortcut } from './CommandPalette';
import { Button } from '../Button';

const meta = {
  title: 'Components/CommandPalette',
  component: CommandPalette,
  tags: ['autodocs'],
};

export default meta;

const items = [
  { id: 'dash', group: 'Pages', label: 'Dashboard', shortcut: 'G D', onSelect: () => {} },
  { id: 'containers', group: 'Pages', label: 'Containers', onSelect: () => {} },
  { id: 'settings', group: 'Pages', label: 'Settings', onSelect: () => {} },
  { id: 'web', group: 'Containers', label: 'web', hint: 'nginx:1.27', onSelect: () => {} },
  { id: 'db', group: 'Containers', label: 'postgres', hint: 'postgres:16', keywords: ['database'], onSelect: () => {} },
  { id: 'new', group: 'Actions', label: 'Create container', onSelect: () => {} },
];

const DefaultStory = () => {
  const [open, setOpen] = useState(false);
  useCommandPaletteShortcut(setOpen);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open (⌘K)</Button>
      <CommandPalette open={open} onClose={() => setOpen(false)} items={items} />
    </>
  );
};

export const Default = { render: () => <DefaultStory /> };
