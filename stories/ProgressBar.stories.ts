import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/progress-bar';

const meta: Meta = {
  title: 'Components/Progress Bar',
  component: 'lit-progress-bar',
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'danger'],
    },
    showLabel: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    value: 50,
    size: 'medium',
    variant: 'primary',
    showLabel: false,
  },
  render: (args) => html`
    <lit-progress-bar
      value=${args.value}
      size=${args.size}
      variant=${args.variant}
      ?showLabel=${args.showLabel}
    ></lit-progress-bar>
  `,
};

export const WithLabel: Story = {
  args: {
    value: 75,
    size: 'large',
    variant: 'primary',
    showLabel: true,
  },
  render: (args) => html`
    <lit-progress-bar
      value=${args.value}
      size=${args.size}
      variant=${args.variant}
      ?showLabel=${args.showLabel}
    ></lit-progress-bar>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <p style="margin: 0 0 4px 0; font-family: 'Nunito Sans', sans-serif; font-size: 14px;">Primary</p>
        <lit-progress-bar value="60" variant="primary" size="medium"></lit-progress-bar>
      </div>
      <div>
        <p style="margin: 0 0 4px 0; font-family: 'Nunito Sans', sans-serif; font-size: 14px;">Success</p>
        <lit-progress-bar value="100" variant="success" size="medium"></lit-progress-bar>
      </div>
      <div>
        <p style="margin: 0 0 4px 0; font-family: 'Nunito Sans', sans-serif; font-size: 14px;">Warning</p>
        <lit-progress-bar value="45" variant="warning" size="medium"></lit-progress-bar>
      </div>
      <div>
        <p style="margin: 0 0 4px 0; font-family: 'Nunito Sans', sans-serif; font-size: 14px;">Danger</p>
        <lit-progress-bar value="25" variant="danger" size="medium"></lit-progress-bar>
      </div>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <p style="margin: 0 0 4px 0; font-family: 'Nunito Sans', sans-serif; font-size: 14px;">Small</p>
        <lit-progress-bar value="60" size="small"></lit-progress-bar>
      </div>
      <div>
        <p style="margin: 0 0 4px 0; font-family: 'Nunito Sans', sans-serif; font-size: 14px;">Medium</p>
        <lit-progress-bar value="60" size="medium"></lit-progress-bar>
      </div>
      <div>
        <p style="margin: 0 0 4px 0; font-family: 'Nunito Sans', sans-serif; font-size: 14px;">Large with label</p>
        <lit-progress-bar value="60" size="large" showLabel></lit-progress-bar>
      </div>
    </div>
  `,
};
