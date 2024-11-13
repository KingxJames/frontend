// DropdownMessage.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import  { DropdownMessage } from './DropdownMessage';

const meta: Meta<typeof DropdownMessage> = {
  title: 'components/DropdownMessage', 
  component: DropdownMessage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
  

export const Default: Story = {
  args: {
   
  },
};