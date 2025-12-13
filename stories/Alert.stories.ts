import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/alert';

const meta: Meta = {
  title: 'Components/Alert',
  component: 'lit-alert',
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
    },
    dismissible: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Info: Story = {
  args: {
    message: 'This is an informational alert message.',
    variant: 'info',
    dismissible: false,
  },
  render: (args) => html`
    <lit-alert
      message=${args.message}
      variant=${args.variant}
      ?dismissible=${args.dismissible}
    ></lit-alert>
  `,
};

export const Success: Story = {
  args: {
    message: 'Operation completed successfully!',
    variant: 'success',
    dismissible: true,
  },
  render: (args) => html`
    <lit-alert
      message=${args.message}
      variant=${args.variant}
      ?dismissible=${args.dismissible}
    ></lit-alert>
  `,
};

export const Warning: Story = {
  args: {
    message: 'Please be careful with this action.',
    variant: 'warning',
    dismissible: true,
  },
  render: (args) => html`
    <lit-alert
      message=${args.message}
      variant=${args.variant}
      ?dismissible=${args.dismissible}
    ></lit-alert>
  `,
};

export const Error: Story = {
  args: {
    message: 'An error occurred. Please try again.',
    variant: 'error',
    dismissible: true,
  },
  render: (args) => html`
    <lit-alert
      message=${args.message}
      variant=${args.variant}
      ?dismissible=${args.dismissible}
    ></lit-alert>
  `,
};
