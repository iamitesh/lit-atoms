import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/dropdown';

const meta: Meta = {
  title: 'Components/Dropdown',
  component: 'lit-dropdown',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Select Country',
    value: '',
    disabled: false,
    placeholder: 'Choose a country',
    options: [
      { label: 'United States', value: 'us' },
      { label: 'Canada', value: 'ca' },
      { label: 'United Kingdom', value: 'uk' },
      { label: 'Germany', value: 'de' },
      { label: 'France', value: 'fr' },
    ],
  },
  render: (args) => html`
    <lit-dropdown
      label=${args.label}
      value=${args.value}
      ?disabled=${args.disabled}
      placeholder=${args.placeholder}
      .options=${args.options}
    ></lit-dropdown>
  `,
};

export const WithValue: Story = {
  args: {
    label: 'Favorite Color',
    value: 'blue',
    disabled: false,
    placeholder: '',
    options: [
      { label: 'Red', value: 'red' },
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
      { label: 'Yellow', value: 'yellow' },
    ],
  },
  render: (args) => html`
    <lit-dropdown
      label=${args.label}
      value=${args.value}
      ?disabled=${args.disabled}
      placeholder=${args.placeholder}
      .options=${args.options}
    ></lit-dropdown>
  `,
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Dropdown',
    value: '',
    disabled: true,
    placeholder: 'Cannot select',
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ],
  },
  render: (args) => html`
    <lit-dropdown
      label=${args.label}
      value=${args.value}
      ?disabled=${args.disabled}
      placeholder=${args.placeholder}
      .options=${args.options}
    ></lit-dropdown>
  `,
};
