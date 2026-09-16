import { EmptyState } from './EmptyState';
import { Button } from '../Button';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  args: {
    title: 'No results found',
    description: 'Try adjusting your filters or search terms.',
  },
};

export const WithAction = {
  args: {
    title: 'No positions yet',
    description: 'Add your first position to start tracking performance.',
    action: <Button variant="primary">Add Position</Button>,
  },
};
