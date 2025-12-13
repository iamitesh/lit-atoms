import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/modal';

const meta: Meta = {
  title: 'Components/Modal',
  component: 'lit-modal',
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    title: { control: 'text' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    closeOnOverlay: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    open: true,
    title: 'Modal Title',
    size: 'medium',
    closeOnOverlay: true,
  },
  render: (args) => html`
    <lit-modal
      ?open=${args.open}
      title=${args.title}
      size=${args.size}
      ?closeOnOverlay=${args.closeOnOverlay}
    >
      <p>This is the modal content. You can add any HTML here.</p>
    </lit-modal>
  `,
};

export const WithFooter: Story = {
  args: {
    open: true,
    title: 'Confirm Action',
    size: 'small',
    closeOnOverlay: true,
  },
  render: (args) => html`
    <lit-modal
      ?open=${args.open}
      title=${args.title}
      size=${args.size}
      ?closeOnOverlay=${args.closeOnOverlay}
    >
      <p>Are you sure you want to continue?</p>
      <div slot="footer" style="display: flex; gap: 8px;">
        <button>Cancel</button>
        <button>Confirm</button>
      </div>
    </lit-modal>
  `,
};

export const Large: Story = {
  args: {
    open: true,
    title: 'Large Modal',
    size: 'large',
    closeOnOverlay: false,
  },
  render: (args) => html`
    <lit-modal
      ?open=${args.open}
      title=${args.title}
      size=${args.size}
      ?closeOnOverlay=${args.closeOnOverlay}
    >
      <p>This is a large modal with lots of content.</p>
      <p>It cannot be closed by clicking the overlay.</p>
    </lit-modal>
  `,
};
