import { Toast } from './Toast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
};

export default meta;

export const Success = {
  args: {
    open: true,
    status: 'success',
    title: 'Order filled',
    description: 'Your buy order for 10 AAPL was filled at $189.42.',
    closable: true,
  },
};

export const Error = {
  args: {
    open: true,
    status: 'error',
    title: 'Order failed',
    description: 'Insufficient buying power for this order.',
    closable: true,
  },
};

export const WithAction = {
  args: {
    open: true,
    status: 'warning',
    title: 'Price alert triggered',
    description: 'TSLA crossed your $250 target.',
    actionLabel: 'View chart',
    closable: true,
  },
};
