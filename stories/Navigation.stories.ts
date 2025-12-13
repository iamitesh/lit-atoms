import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/navigation';

const meta: Meta = {
  title: 'Components/Navigation',
  component: 'lit-navigation',
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    items: [
      { label: 'Home', value: 'home', active: true },
      { label: 'Products', value: 'products' },
      { label: 'Services', value: 'services' },
      { label: 'About', value: 'about' },
      { label: 'Contact', value: 'contact' },
    ],
  },
  render: (args) => html`
    <lit-navigation
      orientation=${args.orientation}
      .items=${args.items}
    ></lit-navigation>
  `,
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    items: [
      { label: 'Dashboard', value: 'dashboard', active: true },
      { label: 'Users', value: 'users' },
      { label: 'Settings', value: 'settings' },
      { label: 'Reports', value: 'reports' },
    ],
  },
  render: (args) => html`
    <lit-navigation
      orientation=${args.orientation}
      .items=${args.items}
    ></lit-navigation>
  `,
};
