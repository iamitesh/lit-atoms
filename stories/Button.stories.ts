import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/button';

const meta: Meta = {
  title: 'Components/Button',
  component: 'lit-button',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'medium',
    disabled: false,
  },
  render: (args) => html`
    <lit-button
      label=${args.label}
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
    ></lit-button>
  `,
};

export const Secondary: Story = {
  args: {
    label: 'Button',
    variant: 'secondary',
    size: 'medium',
    disabled: false,
  },
  render: (args) => html`
    <lit-button
      label=${args.label}
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
    ></lit-button>
  `,
};

export const Small: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'small',
    disabled: false,
  },
  render: (args) => html`
    <lit-button
      label=${args.label}
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
    ></lit-button>
  `,
};

export const Large: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'large',
    disabled: false,
  },
  render: (args) => html`
    <lit-button
      label=${args.label}
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
    ></lit-button>
  `,
};

export const Disabled: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'medium',
    disabled: true,
  },
  render: (args) => html`
    <lit-button
      label=${args.label}
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
    ></lit-button>
  `,
};
