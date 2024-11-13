// UBCardDataStats.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import  { UBCardDataStats } from './UBCardDataStats';

const meta: Meta<typeof UBCardDataStats> = {
  title: 'common/UBCardDataStats', 
  component: UBCardDataStats,
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