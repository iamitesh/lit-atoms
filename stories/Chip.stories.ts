import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/chip';

const meta: Meta = {
  title: 'Components/Chip',
  component: 'lit-chip',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'success', 'warning', 'danger'],
    },
    removable: { control: 'boolean' },
    clickable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Chip',
    variant: 'default',
    removable: false,
    clickable: false,
  },
  render: (args) => html`
    <lit-chip
      label=${args.label}
      variant=${args.variant}
      ?removable=${args.removable}
      ?clickable=${args.clickable}
    ></lit-chip>
  `,
};

export const Removable: Story = {
  args: {
    label: 'Removable Chip',
    variant: 'primary',
    removable: true,
    clickable: false,
  },
  render: (args) => html`
    <lit-chip
      label=${args.label}
      variant=${args.variant}
      ?removable=${args.removable}
      ?clickable=${args.clickable}
    ></lit-chip>
  `,
};

export const Clickable: Story = {
  args: {
    label: 'Clickable Chip',
    variant: 'success',
    removable: false,
    clickable: true,
  },
  render: (args) => html`
    <lit-chip
      label=${args.label}
      variant=${args.variant}
      ?removable=${args.removable}
      ?clickable=${args.clickable}
    ></lit-chip>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <lit-chip label="Default" variant="default"></lit-chip>
      <lit-chip label="Primary" variant="primary"></lit-chip>
      <lit-chip label="Success" variant="success"></lit-chip>
      <lit-chip label="Warning" variant="warning"></lit-chip>
      <lit-chip label="Danger" variant="danger"></lit-chip>
    </div>
  `,
};

export const Tags: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <lit-chip label="JavaScript" variant="primary" removable></lit-chip>
      <lit-chip label="TypeScript" variant="primary" removable></lit-chip>
      <lit-chip label="React" variant="success" removable></lit-chip>
      <lit-chip label="Vue" variant="success" removable></lit-chip>
      <lit-chip label="Angular" variant="warning" removable></lit-chip>
      <lit-chip label="Svelte" variant="danger" removable></lit-chip>
    </div>
  `,
};

export const Filters: Story = {
  render: () => html`
    <div>
      <p style="font-family: 'Nunito Sans', sans-serif; margin: 0 0 8px 0;">Active Filters:</p>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <lit-chip label="Electronics" variant="primary" removable clickable></lit-chip>
        <lit-chip label="Price: $0-$100" variant="success" removable clickable></lit-chip>
        <lit-chip label="In Stock" variant="default" removable clickable></lit-chip>
      </div>
    </div>
  `,
};
