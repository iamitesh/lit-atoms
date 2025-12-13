import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/form';

const meta: Meta = {
  title: 'Components/Form',
  component: 'lit-form',
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    layout: {
      control: { type: 'select' },
      options: ['vertical', 'inline'],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    title: 'Contact Form',
    layout: 'vertical',
  },
  render: (args) => html`
    <lit-form title=${args.title} layout=${args.layout}>
      <label>
        Name: <input type="text" name="name" />
      </label>
      <label>
        Email: <input type="email" name="email" />
      </label>
      <label>
        Message: <textarea name="message"></textarea>
      </label>
      <div slot="actions">
        <button type="button">Cancel</button>
        <button type="submit">Submit</button>
      </div>
    </lit-form>
  `,
};

export const Inline: Story = {
  args: {
    title: '',
    layout: 'inline',
  },
  render: (args) => html`
    <lit-form title=${args.title} layout=${args.layout}>
      <input type="text" name="search" placeholder="Search..." />
      <div slot="actions">
        <button type="submit">Search</button>
      </div>
    </lit-form>
  `,
};

export const Login: Story = {
  args: {
    title: 'Login',
    layout: 'vertical',
  },
  render: (args) => html`
    <lit-form title=${args.title} layout=${args.layout}>
      <label>
        Username: <input type="text" name="username" required />
      </label>
      <label>
        Password: <input type="password" name="password" required />
      </label>
      <div slot="actions">
        <button type="submit">Login</button>
      </div>
    </lit-form>
  `,
};
