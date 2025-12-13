import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/list';

const meta: Meta = {
  title: 'Components/List',
  component: 'lit-list',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['ordered', 'unordered', 'none'],
    },
    divider: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Unordered: Story = {
  args: {
    type: 'unordered',
    divider: false,
    items: [
      { label: 'First item' },
      { label: 'Second item' },
      { label: 'Third item' },
    ],
  },
  render: (args) => html`
    <lit-list type=${args.type} ?divider=${args.divider} .items=${args.items}></lit-list>
  `,
};

export const Ordered: Story = {
  args: {
    type: 'ordered',
    divider: false,
    items: [
      { label: 'Step one' },
      { label: 'Step two' },
      { label: 'Step three' },
    ],
  },
  render: (args) => html`
    <lit-list type=${args.type} ?divider=${args.divider} .items=${args.items}></lit-list>
  `,
};

export const WithDivider: Story = {
  args: {
    type: 'none',
    divider: true,
    items: [
      { label: 'Dashboard', clickable: true },
      { label: 'Profile', clickable: true },
      { label: 'Settings', clickable: true, active: true },
      { label: 'Logout', clickable: true },
    ],
  },
  render: (args) => html`
    <lit-list type=${args.type} ?divider=${args.divider} .items=${args.items}></lit-list>
  `,
};

export const Clickable: Story = {
  args: {
    type: 'none',
    divider: true,
    items: [
      { label: 'Home', value: 'home', clickable: true },
      { label: 'About', value: 'about', clickable: true },
      { label: 'Contact', value: 'contact', clickable: true, active: true },
    ],
  },
  render: (args) => html`
    <lit-list type=${args.type} ?divider=${args.divider} .items=${args.items}></lit-list>
  `,
};
