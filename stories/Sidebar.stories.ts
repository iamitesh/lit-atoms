import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/sidebar';

const meta: Meta = {
  title: 'Components/Sidebar',
  component: 'lit-sidebar',
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    collapsed: { control: 'boolean' },
    header: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    position: 'left',
    size: 'medium',
    collapsed: false,
    header: 'Navigation',
  },
  render: (args) => html`
    <div style="height: 400px; display: flex;">
      <lit-sidebar
        position=${args.position}
        size=${args.size}
        ?collapsed=${args.collapsed}
        header=${args.header}
      >
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <a href="#">Dashboard</a>
          <a href="#">Users</a>
          <a href="#">Settings</a>
          <a href="#">Reports</a>
        </div>
      </lit-sidebar>
      <div style="flex: 1; padding: 20px;">
        <h2>Main Content</h2>
        <p>This is the main content area.</p>
      </div>
    </div>
  `,
};

export const RightSidebar: Story = {
  args: {
    position: 'right',
    size: 'small',
    collapsed: false,
    header: 'Tools',
  },
  render: (args) => html`
    <div style="height: 400px; display: flex;">
      <div style="flex: 1; padding: 20px;">
        <h2>Main Content</h2>
        <p>Content with right sidebar.</p>
      </div>
      <lit-sidebar
        position=${args.position}
        size=${args.size}
        ?collapsed=${args.collapsed}
        header=${args.header}
      >
        <div>Sidebar content</div>
      </lit-sidebar>
    </div>
  `,
};

export const Collapsed: Story = {
  args: {
    position: 'left',
    size: 'medium',
    collapsed: true,
    header: 'Menu',
  },
  render: (args) => html`
    <div style="height: 400px; display: flex;">
      <lit-sidebar
        position=${args.position}
        size=${args.size}
        ?collapsed=${args.collapsed}
        header=${args.header}
      >
        <div>Icons only</div>
      </lit-sidebar>
      <div style="flex: 1; padding: 20px;">
        <h2>Main Content</h2>
      </div>
    </div>
  `,
};
