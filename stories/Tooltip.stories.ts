import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/tooltip';

const meta: Meta = {
  title: 'Components/Tooltip',
  component: 'lit-tooltip',
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Top: Story = {
  args: {
    text: 'This is a tooltip',
    position: 'top',
  },
  render: (args) => html`
    <div style="padding: 50px; text-align: center;">
      <lit-tooltip text=${args.text} position=${args.position}>
        <span style="padding: 8px 16px; background: #1ea7fd; color: white; border-radius: 4px; cursor: pointer;">
          Hover me (Top)
        </span>
      </lit-tooltip>
    </div>
  `,
};

export const Bottom: Story = {
  args: {
    text: 'Tooltip at bottom',
    position: 'bottom',
  },
  render: (args) => html`
    <div style="padding: 50px; text-align: center;">
      <lit-tooltip text=${args.text} position=${args.position}>
        <span style="padding: 8px 16px; background: #1ea7fd; color: white; border-radius: 4px; cursor: pointer;">
          Hover me (Bottom)
        </span>
      </lit-tooltip>
    </div>
  `,
};

export const Left: Story = {
  args: {
    text: 'Tooltip on left',
    position: 'left',
  },
  render: (args) => html`
    <div style="padding: 50px; text-align: center;">
      <lit-tooltip text=${args.text} position=${args.position}>
        <span style="padding: 8px 16px; background: #1ea7fd; color: white; border-radius: 4px; cursor: pointer;">
          Hover me (Left)
        </span>
      </lit-tooltip>
    </div>
  `,
};

export const Right: Story = {
  args: {
    text: 'Tooltip on right',
    position: 'right',
  },
  render: (args) => html`
    <div style="padding: 50px; text-align: center;">
      <lit-tooltip text=${args.text} position=${args.position}>
        <span style="padding: 8px 16px; background: #1ea7fd; color: white; border-radius: 4px; cursor: pointer;">
          Hover me (Right)
        </span>
      </lit-tooltip>
    </div>
  `,
};

export const AllPositions: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; gap: 20px; justify-content: center;">
      <lit-tooltip text="Top tooltip" position="top">
        <button style="padding: 8px 16px;">Top</button>
      </lit-tooltip>
      <lit-tooltip text="Bottom tooltip" position="bottom">
        <button style="padding: 8px 16px;">Bottom</button>
      </lit-tooltip>
      <lit-tooltip text="Left tooltip" position="left">
        <button style="padding: 8px 16px;">Left</button>
      </lit-tooltip>
      <lit-tooltip text="Right tooltip" position="right">
        <button style="padding: 8px 16px;">Right</button>
      </lit-tooltip>
    </div>
  `,
};
