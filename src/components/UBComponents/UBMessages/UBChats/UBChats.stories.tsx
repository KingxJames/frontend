// Chats.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import  { UBChats } from './UBChats';

const meta: Meta<typeof UBChats> = {
  title: 'components/Chats', 
  component: UBChats,
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