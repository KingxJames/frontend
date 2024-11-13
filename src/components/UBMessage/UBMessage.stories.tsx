// UBMessage.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import  { UBMessage } from './UBMessage';

const meta: Meta<typeof UBMessage> = {
  title: 'components/UBMessage', 
  component: UBMessage,
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