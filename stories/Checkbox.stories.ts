import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/checkbox';

const meta: Meta = {
  title: 'Components/Checkbox',
  component: 'lit-checkbox',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    value: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
    checked: false,
    disabled: false,
    value: 'terms',
  },
  render: (args) => html`
    <lit-checkbox
      label=${args.label}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      value=${args.value}
    ></lit-checkbox>
  `,
};

export const Checked: Story = {
  args: {
    label: 'I agree',
    checked: true,
    disabled: false,
    value: 'agree',
  },
  render: (args) => html`
    <lit-checkbox
      label=${args.label}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      value=${args.value}
    ></lit-checkbox>
  `,
};

export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    checked: false,
    disabled: true,
    value: 'disabled',
  },
  render: (args) => html`
    <lit-checkbox
      label=${args.label}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      value=${args.value}
    ></lit-checkbox>
  `,
};
