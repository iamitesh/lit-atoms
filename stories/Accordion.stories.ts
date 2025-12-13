import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/accordion';

const meta: Meta = {
  title: 'Components/Accordion',
  component: 'lit-accordion',
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    open: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    title: 'What is Lit?',
    open: false,
  },
  render: (args) => html`
    <lit-accordion title=${args.title} ?open=${args.open}>
      Lit is a simple library for building fast, lightweight web components.
    </lit-accordion>
  `,
};

export const Open: Story = {
  args: {
    title: 'Frequently Asked Questions',
    open: true,
  },
  render: (args) => html`
    <lit-accordion title=${args.title} ?open=${args.open}>
      <p>This accordion is open by default. Click the header to toggle.</p>
    </lit-accordion>
  `,
};

export const Multiple: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <lit-accordion title="Section 1" ?open=${true}>
        Content for section 1
      </lit-accordion>
      <lit-accordion title="Section 2">
        Content for section 2
      </lit-accordion>
      <lit-accordion title="Section 3">
        Content for section 3
      </lit-accordion>
    </div>
  `,
};
