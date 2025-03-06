// UBMessengerChat.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { UBMessengerChat } from './UBMessengerChat';



const meta: Meta<typeof UBMessengerChat> = {
  title: 'components/UBMessengerChat', 
  component: UBMessengerChat,
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