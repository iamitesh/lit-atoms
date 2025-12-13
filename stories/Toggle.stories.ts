import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/toggle';

const meta: Meta = {
  title: 'Components/Toggle',
  component: 'lit-toggle',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
    checked: false,
    disabled: false,
  },
  render: (args) => html`
    <lit-toggle
      label=${args.label}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
    ></lit-toggle>
  `,
};

export const Checked: Story = {
  args: {
    label: 'Dark mode',
    checked: true,
    disabled: false,
  },
  render: (args) => html`
    <lit-toggle
      label=${args.label}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
    ></lit-toggle>
  `,
};

export const Disabled: Story = {
  args: {
    label: 'Disabled toggle',
    checked: false,
    disabled: true,
  },
  render: (args) => html`
    <lit-toggle
      label=${args.label}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
    ></lit-toggle>
  `,
};

export const WithoutLabel: Story = {
  args: {
    label: '',
    checked: false,
    disabled: false,
  },
  render: (args) => html`
    <lit-toggle
      label=${args.label}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
    ></lit-toggle>
  `,
};
