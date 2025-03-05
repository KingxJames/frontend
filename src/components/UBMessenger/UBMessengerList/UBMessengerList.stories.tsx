// UBMessengerList.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { UBMessengerList } from './UBMessengerList';



const meta: Meta<typeof UBMessengerList> = {
  title: 'components/UBMessengerList', 
  component: UBMessengerList,
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