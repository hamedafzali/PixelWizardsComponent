import { Skeleton } from './Skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  args: {
    width: 200,
    height: 20,
  },
};

export const Circle = {
  args: {
    width: 48,
    height: 48,
    radius: '50%',
  },
};

export const CardPlaceholder = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: 240 }}>
      <Skeleton width={48} height={48} radius="50%" />
      <Skeleton width="100%" height={16} />
      <Skeleton width="80%" height={16} />
    </div>
  ),
};
