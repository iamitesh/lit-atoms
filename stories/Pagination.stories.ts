import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/pagination';

const meta: Meta = {
  title: 'Components/Pagination',
  component: 'lit-pagination',
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: 'number' },
    totalPages: { control: 'number' },
    maxVisible: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    maxVisible: 7,
  },
  render: (args) => html`
    <lit-pagination
      currentPage=${args.currentPage}
      totalPages=${args.totalPages}
      maxVisible=${args.maxVisible}
    ></lit-pagination>
  `,
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    maxVisible: 7,
  },
  render: (args) => html`
    <lit-pagination
      currentPage=${args.currentPage}
      totalPages=${args.totalPages}
      maxVisible=${args.maxVisible}
    ></lit-pagination>
  `,
};

export const ManyPages: Story = {
  args: {
    currentPage: 15,
    totalPages: 50,
    maxVisible: 7,
  },
  render: (args) => html`
    <lit-pagination
      currentPage=${args.currentPage}
      totalPages=${args.totalPages}
      maxVisible=${args.maxVisible}
    ></lit-pagination>
  `,
};
