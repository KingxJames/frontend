// UBVisitorsAnalyticsChart.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import  { UBVisitorsAnalyticsChart } from './UBVisitorsAnalyticsChart';

const meta: Meta<typeof UBVisitorsAnalyticsChart> = {
  title: 'common/UBVisitorsAnalyticsChart', 
  component: UBVisitorsAnalyticsChart,
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