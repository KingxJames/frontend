// UBMyMessage.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import  { UBMyMessage } from './UBMyMessage';

const meta: Meta<typeof UBMyMessage> = {
  title: 'common/UBMyMessage', 
  component: UBMyMessage,
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