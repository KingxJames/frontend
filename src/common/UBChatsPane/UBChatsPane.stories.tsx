// UBChatsPane.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import  { UBChatsPane } from './UBChatsPane';

const meta: Meta<typeof UBChatsPane> = {
  title: 'common/UBChatsPane', 
  component: UBChatsPane,
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