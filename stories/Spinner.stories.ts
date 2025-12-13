import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/spinner';

const meta: Meta = {
  title: 'Components/Spinner',
  component: 'lit-spinner',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Small: Story = {
  args: {
    size: 'small',
  },
  render: (args) => html`
    <lit-spinner size=${args.size}></lit-spinner>
  `,
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
  render: (args) => html`
    <lit-spinner size=${args.size}></lit-spinner>
  `,
};

export const Large: Story = {
  args: {
    size: 'large',
  },
  render: (args) => html`
    <lit-spinner size=${args.size}></lit-spinner>
  `,
};

export const AllSizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 20px; align-items: center;">
      <lit-spinner size="small"></lit-spinner>
      <lit-spinner size="medium"></lit-spinner>
      <lit-spinner size="large"></lit-spinner>
    </div>
  `,
};

export const Loading: Story = {
  render: () => html`
    <div style="text-align: center; padding: 40px;">
      <lit-spinner size="large"></lit-spinner>
      <p style="margin-top: 20px; font-family: 'Nunito Sans', sans-serif; color: #666;">
        Loading...
      </p>
    </div>
  `,
};
