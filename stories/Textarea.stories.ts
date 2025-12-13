import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/textarea';

const meta: Meta = {
  title: 'Components/Textarea',
  component: 'lit-textarea',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    rows: { control: 'number' },
    helperText: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter your description',
    value: '',
    disabled: false,
    required: false,
    rows: 4,
    helperText: 'Provide a detailed description',
  },
  render: (args) => html`
    <lit-textarea
      label=${args.label}
      placeholder=${args.placeholder}
      value=${args.value}
      ?disabled=${args.disabled}
      ?required=${args.required}
      rows=${args.rows}
      helperText=${args.helperText}
    ></lit-textarea>
  `,
};

export const WithContent: Story = {
  args: {
    label: 'Bio',
    placeholder: '',
    value: 'This is a sample bio text that spans multiple lines.',
    disabled: false,
    required: true,
    rows: 6,
    helperText: '',
  },
  render: (args) => html`
    <lit-textarea
      label=${args.label}
      placeholder=${args.placeholder}
      value=${args.value}
      ?disabled=${args.disabled}
      ?required=${args.required}
      rows=${args.rows}
      helperText=${args.helperText}
    ></lit-textarea>
  `,
};

export const Disabled: Story = {
  args: {
    label: 'Comments',
    placeholder: 'Comments disabled',
    value: '',
    disabled: true,
    required: false,
    rows: 4,
    helperText: '',
  },
  render: (args) => html`
    <lit-textarea
      label=${args.label}
      placeholder=${args.placeholder}
      value=${args.value}
      ?disabled=${args.disabled}
      ?required=${args.required}
      rows=${args.rows}
      helperText=${args.helperText}
    ></lit-textarea>
  `,
};
