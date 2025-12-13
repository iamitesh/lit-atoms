import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/header';
import '../src/components/button';

const meta: Meta = {
  title: 'Components/Header',
  component: 'lit-header',
  tags: ['autodocs'],
  argTypes: {
    logo: { control: 'text' },
    title: { control: 'text' },
    sticky: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    logo: '🚀',
    title: 'My Application',
    sticky: false,
  },
  render: (args) => html`
    <lit-header
      logo=${args.logo}
      title=${args.title}
      ?sticky=${args.sticky}
    >
      <div slot="right">
        <lit-button label="Login" variant="secondary" size="small"></lit-button>
      </div>
    </lit-header>
  `,
};

export const Sticky: Story = {
  args: {
    logo: '📱',
    title: 'Dashboard',
    sticky: true,
  },
  render: (args) => html`
    <lit-header
      logo=${args.logo}
      title=${args.title}
      ?sticky=${args.sticky}
    ></lit-header>
  `,
};

export const WithActions: Story = {
  args: {
    logo: '💡',
    title: 'Lit Atoms',
    sticky: false,
  },
  render: (args) => html`
    <lit-header
      logo=${args.logo}
      title=${args.title}
      ?sticky=${args.sticky}
    >
      <div slot="left">Navigation</div>
      <div slot="right" style="display: flex; gap: 8px;">
        <button>Search</button>
        <button>Profile</button>
      </div>
    </lit-header>
  `,
};
