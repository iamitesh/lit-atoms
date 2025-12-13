import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/tabs';

const meta: Meta = {
  title: 'Components/Tabs',
  component: 'lit-tabs',
  tags: ['autodocs'],
  argTypes: {
    activeTab: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    activeTab: 'tab1',
    tabs: [
      { label: 'Tab 1', value: 'tab1' },
      { label: 'Tab 2', value: 'tab2' },
      { label: 'Tab 3', value: 'tab3' },
    ],
  },
  render: (args) => html`
    <lit-tabs activeTab=${args.activeTab} .tabs=${args.tabs}>
      <div slot="tab1">Content for Tab 1</div>
      <div slot="tab2">Content for Tab 2</div>
      <div slot="tab3">Content for Tab 3</div>
    </lit-tabs>
  `,
};

export const WithDisabled: Story = {
  args: {
    activeTab: 'home',
    tabs: [
      { label: 'Home', value: 'home' },
      { label: 'Profile', value: 'profile' },
      { label: 'Settings', value: 'settings', disabled: true },
      { label: 'Help', value: 'help' },
    ],
  },
  render: (args) => html`
    <lit-tabs activeTab=${args.activeTab} .tabs=${args.tabs}>
      <div slot="home">Welcome to the home page!</div>
      <div slot="profile">Your profile information</div>
      <div slot="settings">Settings (disabled)</div>
      <div slot="help">Help and support</div>
    </lit-tabs>
  `,
};
