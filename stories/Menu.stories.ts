import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/menu';

const meta: Meta = {
  title: 'Components/Menu',
  component: 'lit-menu',
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    placement: 'left',
    items: [
      { label: 'Profile', value: 'profile' },
      { label: 'Settings', value: 'settings' },
      { label: 'Logout', value: 'logout' },
    ],
  },
  render: (args) => html`
    <lit-menu placement=${args.placement} .items=${args.items}>
      <button slot="trigger">Open Menu</button>
    </lit-menu>
  `,
};

export const WithDivider: Story = {
  args: {
    placement: 'left',
    items: [
      { label: 'New File', value: 'new' },
      { label: 'Open', value: 'open' },
      { label: 'Save', value: 'save' },
      { divider: true },
      { label: 'Exit', value: 'exit' },
    ],
  },
  render: (args) => html`
    <lit-menu placement=${args.placement} .items=${args.items}>
      <button slot="trigger">File</button>
    </lit-menu>
  `,
};

export const WithDisabled: Story = {
  args: {
    placement: 'right',
    items: [
      { label: 'Cut', value: 'cut' },
      { label: 'Copy', value: 'copy' },
      { label: 'Paste', value: 'paste', disabled: true },
    ],
  },
  render: (args) => html`
    <lit-menu placement=${args.placement} .items=${args.items}>
      <button slot="trigger">Edit Menu</button>
    </lit-menu>
  `,
};
