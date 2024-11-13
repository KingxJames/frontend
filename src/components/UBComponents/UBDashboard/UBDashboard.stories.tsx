// UBDashboard.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import  { UBDashboard } from './UBDashboard';

const meta: Meta<typeof UBDashboard> = {
  title: 'components/UBDashboard', 
  component: UBDashboard,
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