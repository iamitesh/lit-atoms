import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/card';

const meta: Meta = {
  title: 'Components/Card',
  component: 'lit-card',
  tags: ['autodocs'],
  argTypes: {
    header: { control: 'text' },
    footer: { control: 'text' },
    elevated: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    header: 'Card Title',
    footer: 'Card Footer',
    elevated: false,
  },
  render: (args) => html`
    <lit-card
      header=${args.header}
      footer=${args.footer}
      ?elevated=${args.elevated}
    >
      <p>This is the card content. You can put any content here.</p>
    </lit-card>
  `,
};

export const Elevated: Story = {
  args: {
    header: 'Elevated Card',
    footer: '',
    elevated: true,
  },
  render: (args) => html`
    <lit-card
      header=${args.header}
      footer=${args.footer}
      ?elevated=${args.elevated}
    >
      <p>This card has an elevated shadow effect.</p>
    </lit-card>
  `,
};

export const NoHeaderFooter: Story = {
  args: {
    header: '',
    footer: '',
    elevated: false,
  },
  render: (args) => html`
    <lit-card
      header=${args.header}
      footer=${args.footer}
      ?elevated=${args.elevated}
    >
      <div style="padding: 8px;">
        <h3 style="margin: 0 0 8px 0;">Custom Content</h3>
        <p style="margin: 0;">This card uses custom HTML content without predefined header or footer.</p>
      </div>
    </lit-card>
  `,
};

export const WithImage: Story = {
  args: {
    header: 'Product Card',
    footer: 'Price: $99.99',
    elevated: true,
  },
  render: (args) => html`
    <lit-card
      header=${args.header}
      footer=${args.footer}
      ?elevated=${args.elevated}
    >
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 200px; margin: -16px -16px 16px -16px;"></div>
      <p>A beautiful product with an amazing design.</p>
    </lit-card>
  `,
};
