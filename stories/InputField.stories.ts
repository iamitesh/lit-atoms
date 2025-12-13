import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/input-field';

const meta: Meta = {
  title: 'Components/Input Field',
  component: 'lit-input-field',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    helperText: { control: 'text' },
    errorText: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    value: '',
    type: 'email',
    disabled: false,
    required: false,
    helperText: 'We will never share your email',
    errorText: '',
  },
  render: (args) => html`
    <lit-input-field
      label=${args.label}
      placeholder=${args.placeholder}
      value=${args.value}
      type=${args.type}
      ?disabled=${args.disabled}
      ?required=${args.required}
      helperText=${args.helperText}
      errorText=${args.errorText}
    ></lit-input-field>
  `,
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    value: 'invalid-email',
    type: 'email',
    disabled: false,
    required: true,
    helperText: '',
    errorText: 'Please enter a valid email address',
  },
  render: (args) => html`
    <lit-input-field
      label=${args.label}
      placeholder=${args.placeholder}
      value=${args.value}
      type=${args.type}
      ?disabled=${args.disabled}
      ?required=${args.required}
      helperText=${args.helperText}
      errorText=${args.errorText}
    ></lit-input-field>
  `,
};

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    value: '',
    type: 'password',
    disabled: false,
    required: true,
    helperText: 'Must be at least 8 characters',
    errorText: '',
  },
  render: (args) => html`
    <lit-input-field
      label=${args.label}
      placeholder=${args.placeholder}
      value=${args.value}
      type=${args.type}
      ?disabled=${args.disabled}
      ?required=${args.required}
      helperText=${args.helperText}
      errorText=${args.errorText}
    ></lit-input-field>
  `,
};

export const Disabled: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    value: 'john_doe',
    type: 'text',
    disabled: true,
    required: false,
    helperText: '',
    errorText: '',
  },
  render: (args) => html`
    <lit-input-field
      label=${args.label}
      placeholder=${args.placeholder}
      value=${args.value}
      type=${args.type}
      ?disabled=${args.disabled}
      ?required=${args.required}
      helperText=${args.helperText}
      errorText=${args.errorText}
    ></lit-input-field>
  `,
};
