import { useState } from 'react';
import { Drawer } from './Drawer';
import { Button } from '../Button';

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
};

export default meta;

function DrawerDemo({ position }: { position?: 'left' | 'right' | 'top' | 'bottom' }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Filters" position={position}>
        <p>Drawer content goes here.</p>
      </Drawer>
    </div>
  );
}

export const Right = {
  render: () => <DrawerDemo position="right" />,
};

export const Left = {
  render: () => <DrawerDemo position="left" />,
};

export const Bottom = {
  render: () => <DrawerDemo position="bottom" />,
};
