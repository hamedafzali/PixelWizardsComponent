import type { Meta, StoryObj } from '@storybook/react';
import { Form } from './Form';
import { FormField } from './FormField';
import { useForm } from '../../hooks/useForm';
import { Input } from '../Input';
import { Select } from '../Select';
import { Checkbox } from '../Checkbox';
import { Button } from '../Button';

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
};

export default meta;
type Story = StoryObj<typeof Form>;

interface TradeOrderValues extends Record<string, unknown> {
  symbol: string;
  side: string;
  quantity: string;
  acceptRisk: boolean;
}

function TradeOrderFormDemo() {
  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } =
    useForm<TradeOrderValues>({
      initialValues: { symbol: '', side: 'buy', quantity: '', acceptRisk: false },
      validate: (v) => {
        const errs: Partial<Record<keyof TradeOrderValues, string>> = {};
        if (!v.symbol) errs.symbol = 'Symbol is required';
        if (!v.quantity || Number(v.quantity) <= 0) errs.quantity = 'Enter a valid quantity';
        if (!v.acceptRisk) errs.acceptRisk = 'You must accept the risk disclosure';
        return errs;
      },
      onSubmit: async (v) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        alert(`Order submitted: ${JSON.stringify(v)}`);
      },
    });

  return (
    <Form onSubmit={handleSubmit} style={{ maxWidth: 360, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <FormField label="Symbol" htmlFor="symbol" required error={touched.symbol && errors.symbol}>
        <Input
          id="symbol"
          value={values.symbol}
          onChange={handleChange('symbol')}
          onBlur={handleBlur('symbol')}
          placeholder="AAPL"
        />
      </FormField>

      <FormField label="Side" htmlFor="side">
        <Select
          options={[
            { value: 'buy', label: 'Buy' },
            { value: 'sell', label: 'Sell' },
          ]}
          value={values.side}
          onChange={(value) => handleChange('side')(String(value))}
        />
      </FormField>

      <FormField label="Quantity" htmlFor="quantity" required error={touched.quantity && errors.quantity}>
        <Input
          id="quantity"
          type="number"
          value={values.quantity}
          onChange={handleChange('quantity')}
          onBlur={handleBlur('quantity')}
          placeholder="100"
        />
      </FormField>

      <FormField error={touched.acceptRisk && errors.acceptRisk}>
        <Checkbox
          label="I accept the risk disclosure"
          checked={values.acceptRisk}
          onChange={handleChange('acceptRisk')}
        />
      </FormField>

      <Button type="submit" loading={isSubmitting}>
        Submit Order
      </Button>
    </Form>
  );
}

export const TradeOrder: Story = {
  render: () => <TradeOrderFormDemo />,
};
