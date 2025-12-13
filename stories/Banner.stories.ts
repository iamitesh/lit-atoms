import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/banner';

const meta: Meta = {
  title: 'Components/Banner',
  component: 'lit-banner',
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    message: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
    },
    dismissible: { control: 'boolean' },
    visible: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Info: Story = {
  args: {
    title: 'Information',
    message: 'This is an informational message.',
    variant: 'info',
    dismissible: true,
    visible: true,
  },
  render: (args) => html`
    <lit-banner
      title=${args.title}
      message=${args.message}
      variant=${args.variant}
      ?dismissible=${args.dismissible}
      ?visible=${args.visible}
    ></lit-banner>
  `,
};

export const Success: Story = {
  args: {
    title: 'Success',
    message: 'Your changes have been saved successfully!',
    variant: 'success',
    dismissible: true,
    visible: true,
  },
  render: (args) => html`
    <lit-banner
      title=${args.title}
      message=${args.message}
      variant=${args.variant}
      ?dismissible=${args.dismissible}
      ?visible=${args.visible}
    ></lit-banner>
  `,
};

export const Warning: Story = {
  args: {
    title: 'Warning',
    message: 'Please review your settings before proceeding.',
    variant: 'warning',
    dismissible: true,
    visible: true,
  },
  render: (args) => html`
    <lit-banner
      title=${args.title}
      message=${args.message}
      variant=${args.variant}
      ?dismissible=${args.dismissible}
      ?visible=${args.visible}
    ></lit-banner>
  `,
};

export const Error: Story = {
  args: {
    title: 'Error',
    message: 'An error occurred while processing your request.',
    variant: 'error',
    dismissible: true,
    visible: true,
  },
  render: (args) => html`
    <lit-banner
      title=${args.title}
      message=${args.message}
      variant=${args.variant}
      ?dismissible=${args.dismissible}
      ?visible=${args.visible}
    ></lit-banner>
  `,
};

export const WithoutTitle: Story = {
  args: {
    title: '',
    message: 'This banner has no title, just a message.',
    variant: 'info',
    dismissible: false,
    visible: true,
  },
  render: (args) => html`
    <lit-banner
      title=${args.title}
      message=${args.message}
      variant=${args.variant}
      ?dismissible=${args.dismissible}
      ?visible=${args.visible}
    ></lit-banner>
  `,
};
