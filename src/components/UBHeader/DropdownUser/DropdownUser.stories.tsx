// DropdownUser.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import  { DropdownUser } from './DropdownUser';

const meta: Meta<typeof DropdownUser> = {
  title: 'components/DropdownUser', 
  component: DropdownUser,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
  

export const Default: Story = {
  args: {
    name: 'James Faber',
    position: 'Software Engineer',
  },
};