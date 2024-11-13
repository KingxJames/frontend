// UBChatBubble.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import  { UBChatBubble } from './UBChatBubble';

const meta: Meta<typeof UBChatBubble> = {
  title: 'common/UBChatBubble', 
  component: UBChatBubble,
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