import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/link';

const meta: Meta = {
  title: 'Components/Link',
  component: 'lit-link',
  tags: ['autodocs'],
  argTypes: {
    href: { control: 'text' },
    target: { control: 'text' },
    disabled: { control: 'boolean' },
    underline: { control: 'boolean' },
    bold: { control: 'boolean' },
    external: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    href: '#',
    disabled: false,
    underline: false,
    bold: false,
    external: false,
  },
  render: (args) => html`
    <lit-link
      href=${args.href}
      ?disabled=${args.disabled}
      ?underline=${args.underline}
      ?bold=${args.bold}
      ?external=${args.external}
    >
      Click me
    </lit-link>
  `,
};

export const External: Story = {
  args: {
    href: 'https://example.com',
    external: true,
    disabled: false,
    underline: false,
    bold: false,
  },
  render: (args) => html`
    <lit-link
      href=${args.href}
      ?disabled=${args.disabled}
      ?underline=${args.underline}
      ?bold=${args.bold}
      ?external=${args.external}
    >
      External Link
    </lit-link>
  `,
};

export const Underlined: Story = {
  args: {
    href: '#',
    underline: true,
    bold: false,
    disabled: false,
    external: false,
  },
  render: (args) => html`
    <lit-link
      href=${args.href}
      ?disabled=${args.disabled}
      ?underline=${args.underline}
      ?bold=${args.bold}
      ?external=${args.external}
    >
      Underlined Link
    </lit-link>
  `,
};

export const Disabled: Story = {
  args: {
    href: '#',
    disabled: true,
    underline: false,
    bold: false,
    external: false,
  },
  render: (args) => html`
    <lit-link
      href=${args.href}
      ?disabled=${args.disabled}
      ?underline=${args.underline}
      ?bold=${args.bold}
      ?external=${args.external}
    >
      Disabled Link
    </lit-link>
  `,
};
