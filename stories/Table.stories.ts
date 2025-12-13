import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/table';
import '../src/components/table-header';
import '../src/components/table-body';
import '../src/components/table-row';
import '../src/components/table-header-cell';
import '../src/components/table-cell';

const meta: Meta = {
  title: 'Components/Table',
  component: 'lit-table',
  tags: ['autodocs'],
  argTypes: {
    striped: { control: 'boolean' },
    bordered: { control: 'boolean' },
    hoverable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    striped: false,
    bordered: false,
    hoverable: false,
  },
  render: (args) => html`
    <lit-table
      ?striped=${args.striped}
      ?bordered=${args.bordered}
      ?hoverable=${args.hoverable}
    >
      <lit-table-header>
        <lit-table-row>
          <lit-table-header-cell>Name</lit-table-header-cell>
          <lit-table-header-cell>Email</lit-table-header-cell>
          <lit-table-header-cell>Role</lit-table-header-cell>
        </lit-table-row>
      </lit-table-header>
      <lit-table-body>
        <lit-table-row>
          <lit-table-cell>John Doe</lit-table-cell>
          <lit-table-cell>john@example.com</lit-table-cell>
          <lit-table-cell>Admin</lit-table-cell>
        </lit-table-row>
        <lit-table-row>
          <lit-table-cell>Jane Smith</lit-table-cell>
          <lit-table-cell>jane@example.com</lit-table-cell>
          <lit-table-cell>User</lit-table-cell>
        </lit-table-row>
        <lit-table-row>
          <lit-table-cell>Bob Johnson</lit-table-cell>
          <lit-table-cell>bob@example.com</lit-table-cell>
          <lit-table-cell>User</lit-table-cell>
        </lit-table-row>
      </lit-table-body>
    </lit-table>
  `,
};

export const Striped: Story = {
  args: {
    striped: true,
    bordered: false,
    hoverable: false,
  },
  render: (args) => html`
    <lit-table
      ?striped=${args.striped}
      ?bordered=${args.bordered}
      ?hoverable=${args.hoverable}
    >
      <lit-table-header>
        <lit-table-row>
          <lit-table-header-cell>Product</lit-table-header-cell>
          <lit-table-header-cell>Price</lit-table-header-cell>
          <lit-table-header-cell>Stock</lit-table-header-cell>
        </lit-table-row>
      </lit-table-header>
      <lit-table-body>
        <lit-table-row>
          <lit-table-cell>Widget A</lit-table-cell>
          <lit-table-cell>$19.99</lit-table-cell>
          <lit-table-cell>100</lit-table-cell>
        </lit-table-row>
        <lit-table-row>
          <lit-table-cell>Widget B</lit-table-cell>
          <lit-table-cell>$29.99</lit-table-cell>
          <lit-table-cell>50</lit-table-cell>
        </lit-table-row>
        <lit-table-row>
          <lit-table-cell>Widget C</lit-table-cell>
          <lit-table-cell>$39.99</lit-table-cell>
          <lit-table-cell>75</lit-table-cell>
        </lit-table-row>
      </lit-table-body>
    </lit-table>
  `,
};

export const Bordered: Story = {
  args: {
    striped: false,
    bordered: true,
    hoverable: true,
  },
  render: (args) => html`
    <lit-table
      ?striped=${args.striped}
      ?bordered=${args.bordered}
      ?hoverable=${args.hoverable}
    >
      <lit-table-header>
        <lit-table-row>
          <lit-table-header-cell sortable>ID</lit-table-header-cell>
          <lit-table-header-cell sortable>Name</lit-table-header-cell>
          <lit-table-header-cell>Status</lit-table-header-cell>
        </lit-table-row>
      </lit-table-header>
      <lit-table-body>
        <lit-table-row>
          <lit-table-cell>1</lit-table-cell>
          <lit-table-cell>Alice</lit-table-cell>
          <lit-table-cell>Active</lit-table-cell>
        </lit-table-row>
        <lit-table-row>
          <lit-table-cell>2</lit-table-cell>
          <lit-table-cell>Bob</lit-table-cell>
          <lit-table-cell>Inactive</lit-table-cell>
        </lit-table-row>
      </lit-table-body>
    </lit-table>
  `,
};
