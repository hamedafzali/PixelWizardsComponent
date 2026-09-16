import type { CSSProperties } from 'react';
import { LiquidGlassCard } from './LiquidGlassCard';
import { LiquidGlassButton } from './LiquidGlassButton';
import { MultiThemeProvider } from '../../themes/MultiThemeProvider';

const meta = {
  title: 'Components/LiquidGlass',
  tags: ['autodocs'],
};

export default meta;

const backdrop: CSSProperties = {
  padding: '2rem',
  background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
};

export const Card = {
  render: () => (
    <MultiThemeProvider defaultTheme="liquid-glass-light">
      <div style={backdrop}>
        <LiquidGlassCard blur="medium" edgeLight="medium" reflection="subtle">
          <h3 style={{ margin: 0 }}>Liquid Glass Card</h3>
          <p>Frosted, translucent surface with edge lighting.</p>
        </LiquidGlassCard>
      </div>
    </MultiThemeProvider>
  ),
};

export const FloatingCard = {
  render: () => (
    <MultiThemeProvider defaultTheme="liquid-glass-light">
      <div style={backdrop}>
        <LiquidGlassCard blur="strong" reflection="strong" floating>
          <h3 style={{ margin: 0 }}>Floating Variant</h3>
        </LiquidGlassCard>
      </div>
    </MultiThemeProvider>
  ),
};

export const Button = {
  render: () => (
    <MultiThemeProvider defaultTheme="liquid-glass-light">
      <div style={backdrop}>
        <LiquidGlassButton>Get Started</LiquidGlassButton>
      </div>
    </MultiThemeProvider>
  ),
};
