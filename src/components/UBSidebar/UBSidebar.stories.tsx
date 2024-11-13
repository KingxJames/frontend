// UBSidebar.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import  { UBSidebar } from './UBSidebar';

const meta: Meta<typeof UBSidebar> = {
  title: 'components/UBSidebar', 
  component: UBSidebar,
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