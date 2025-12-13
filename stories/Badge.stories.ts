import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/badge';

const meta: Meta = {
  title: 'Components/Badge',
  component: 'lit-badge',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'danger', 'info', 'neutral'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    label: 'Primary',
    variant: 'primary',
    size: 'medium',
  },
  render: (args) => html`
    <lit-badge
      label=${args.label}
      variant=${args.variant}
      size=${args.size}
    ></lit-badge>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <lit-badge label="Primary" variant="primary"></lit-badge>
      <lit-badge label="Success" variant="success"></lit-badge>
      <lit-badge label="Warning" variant="warning"></lit-badge>
      <lit-badge label="Danger" variant="danger"></lit-badge>
      <lit-badge label="Info" variant="info"></lit-badge>
      <lit-badge label="Neutral" variant="neutral"></lit-badge>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; align-items: center;">
      <lit-badge label="Small" variant="primary" size="small"></lit-badge>
      <lit-badge label="Medium" variant="primary" size="medium"></lit-badge>
      <lit-badge label="Large" variant="primary" size="large"></lit-badge>
    </div>
  `,
};

export const Numbers: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px;">
      <lit-badge label="1" variant="danger" size="small"></lit-badge>
      <lit-badge label="99+" variant="danger" size="small"></lit-badge>
      <lit-badge label="New" variant="success" size="small"></lit-badge>
    </div>
  `,
};
