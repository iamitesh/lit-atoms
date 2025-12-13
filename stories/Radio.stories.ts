import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/radio';

const meta: Meta = {
  title: 'Components/Radio',
  component: 'lit-radio',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    value: { control: 'text' },
    name: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Option 1',
    checked: false,
    disabled: false,
    value: 'option1',
    name: 'options',
  },
  render: (args) => html`
    <lit-radio
      label=${args.label}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      value=${args.value}
      name=${args.name}
    ></lit-radio>
  `,
};

export const RadioGroup: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <lit-radio label="Option 1" value="option1" name="group1" checked></lit-radio>
      <lit-radio label="Option 2" value="option2" name="group1"></lit-radio>
      <lit-radio label="Option 3" value="option3" name="group1"></lit-radio>
    </div>
  `,
};

export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    checked: false,
    disabled: true,
    value: 'disabled',
    name: 'options',
  },
  render: (args) => html`
    <lit-radio
      label=${args.label}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      value=${args.value}
      name=${args.name}
    ></lit-radio>
  `,
};
