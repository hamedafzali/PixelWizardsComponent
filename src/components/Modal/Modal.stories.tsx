import React from "react";
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;

export const Default= {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Modal Title">
          <p>This is the modal content. You can put anything here.</p>
        </Modal>
      </>
    );
  },
};

export const WithHeaderAndFooter= {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Modal with Header & Footer"
          header={<h2>Custom Header</h2>}
          footer={
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </div>
          }
        >
          <p>This modal has a custom header and footer.</p>
        </Modal>
      </>
    );
  },
};

