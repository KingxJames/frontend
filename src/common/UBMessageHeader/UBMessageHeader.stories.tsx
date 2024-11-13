// UBMessageHeader.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import  {UBMessageHeader}  from './UBMessageHeader';

const meta: Meta<typeof UBMessageHeader> = {
  title: 'common/UBMessageHeader', 
  component: UBMessageHeader,
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