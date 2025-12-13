import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/avatar';

const meta: Meta = {
  title: 'Components/Avatar',
  component: 'lit-avatar',
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    initials: { control: 'text' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    shape: {
      control: { type: 'select' },
      options: ['circle', 'square'],
    },
    status: {
      control: { type: 'select' },
      options: ['', 'online', 'offline', 'busy'],
    },
  },
};

export default meta;
type Story = StoryObj;

export const WithInitials: Story = {
  args: {
    initials: 'JD',
    size: 'medium',
    shape: 'circle',
    status: '',
  },
  render: (args) => html`
    <lit-avatar
      initials=${args.initials}
      size=${args.size}
      shape=${args.shape}
      status=${args.status}
    ></lit-avatar>
  `,
};

export const WithImage: Story = {
  args: {
    src: 'https://via.placeholder.com/64',
    alt: 'User Avatar',
    size: 'medium',
    shape: 'circle',
    status: '',
  },
  render: (args) => html`
    <lit-avatar
      src=${args.src}
      alt=${args.alt}
      size=${args.size}
      shape=${args.shape}
      status=${args.status}
    ></lit-avatar>
  `,
};

export const WithStatus: Story = {
  args: {
    initials: 'AB',
    size: 'large',
    shape: 'circle',
    status: 'online',
  },
  render: (args) => html`
    <lit-avatar
      initials=${args.initials}
      size=${args.size}
      shape=${args.shape}
      status=${args.status}
    ></lit-avatar>
  `,
};

export const Square: Story = {
  args: {
    initials: 'SQ',
    size: 'medium',
    shape: 'square',
    status: '',
  },
  render: (args) => html`
    <lit-avatar
      initials=${args.initials}
      size=${args.size}
      shape=${args.shape}
      status=${args.status}
    ></lit-avatar>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <lit-avatar initials="SM" size="small"></lit-avatar>
      <lit-avatar initials="MD" size="medium"></lit-avatar>
      <lit-avatar initials="LG" size="large"></lit-avatar>
    </div>
  `,
};
