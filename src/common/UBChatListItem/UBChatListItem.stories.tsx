// UBChatListItem.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import  { UBChatListItem } from './UBChatListItem';

const meta: Meta<typeof UBChatListItem> = {
  title: 'common/UBChatListItem', 
  component: UBChatListItem,
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