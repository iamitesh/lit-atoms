import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/footer';

const meta: Meta = {
  title: 'Components/Footer',
  component: 'lit-footer',
  tags: ['autodocs'],
  argTypes: {
    copyright: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    copyright: '© 2024 Lit Atoms. All rights reserved.',
  },
  render: (args) => html`
    <lit-footer copyright=${args.copyright}>
      <div slot="links">
        <a href="#">About</a>
        <a href="#">Contact</a>
        <a href="#">Privacy</a>
      </div>
    </lit-footer>
  `,
};

export const Simple: Story = {
  args: {
    copyright: '© 2024 My Company',
  },
  render: (args) => html`
    <lit-footer copyright=${args.copyright}></lit-footer>
  `,
};

export const WithLinks: Story = {
  args: {
    copyright: '© 2024 Lit Atoms',
  },
  render: (args) => html`
    <lit-footer copyright=${args.copyright}>
      <div slot="links">
        <a href="#">Home</a>
        <a href="#">Products</a>
        <a href="#">Services</a>
        <a href="#">Blog</a>
        <a href="#">Contact</a>
      </div>
    </lit-footer>
  `,
};
