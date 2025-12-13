import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/divider';

const meta: Meta = {
  title: 'Components/Divider',
  component: 'lit-divider',
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: { type: 'select' },
      options: ['solid', 'dashed'],
    },
    thick: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    thick: false,
  },
  render: (args) => html`
    <div>
      <p>Content above divider</p>
      <lit-divider
        orientation=${args.orientation}
        variant=${args.variant}
        ?thick=${args.thick}
      ></lit-divider>
      <p>Content below divider</p>
    </div>
  `,
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    variant: 'solid',
    thick: false,
  },
  render: (args) => html`
    <div style="display: flex; align-items: center; height: 100px;">
      <span>Left content</span>
      <lit-divider
        orientation=${args.orientation}
        variant=${args.variant}
        ?thick=${args.thick}
      ></lit-divider>
      <span>Right content</span>
    </div>
  `,
};

export const Dashed: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'dashed',
    thick: false,
  },
  render: (args) => html`
    <div>
      <p>Content above divider</p>
      <lit-divider
        orientation=${args.orientation}
        variant=${args.variant}
        ?thick=${args.thick}
      ></lit-divider>
      <p>Content below divider</p>
    </div>
  `,
};

export const Thick: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    thick: true,
  },
  render: (args) => html`
    <div>
      <p>Content above divider</p>
      <lit-divider
        orientation=${args.orientation}
        variant=${args.variant}
        ?thick=${args.thick}
      ></lit-divider>
      <p>Content below divider</p>
    </div>
  `,
};

export const Menu: Story = {
  render: () => html`
    <div style="font-family: 'Nunito Sans', sans-serif;">
      <h3 style="margin: 0 0 8px 0;">Section 1</h3>
      <p style="margin: 0;">Content for section 1</p>
      <lit-divider></lit-divider>
      <h3 style="margin: 0 0 8px 0;">Section 2</h3>
      <p style="margin: 0;">Content for section 2</p>
      <lit-divider></lit-divider>
      <h3 style="margin: 0 0 8px 0;">Section 3</h3>
      <p style="margin: 0;">Content for section 3</p>
    </div>
  `,
};
