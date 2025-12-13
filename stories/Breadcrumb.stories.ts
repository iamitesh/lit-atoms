import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/breadcrumb';

const meta: Meta = {
  title: 'Components/Breadcrumb',
  component: 'lit-breadcrumb',
  tags: ['autodocs'],
  argTypes: {
    separator: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    separator: '/',
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Category', href: '/products/category' },
      { label: 'Item', active: true },
    ],
  },
  render: (args) => html`
    <lit-breadcrumb
      separator=${args.separator}
      .items=${args.items}
    ></lit-breadcrumb>
  `,
};

export const ArrowSeparator: Story = {
  args: {
    separator: '›',
    items: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Settings', href: '/settings' },
      { label: 'Profile', active: true },
    ],
  },
  render: (args) => html`
    <lit-breadcrumb
      separator=${args.separator}
      .items=${args.items}
    ></lit-breadcrumb>
  `,
};

export const DotSeparator: Story = {
  args: {
    separator: '·',
    items: [
      { label: 'Home' },
      { label: 'Blog' },
      { label: 'Article', active: true },
    ],
  },
  render: (args) => html`
    <lit-breadcrumb
      separator=${args.separator}
      .items=${args.items}
    ></lit-breadcrumb>
  `,
};
