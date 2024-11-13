// UBHeader.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import  { UBHeader } from './UBHeader';

const meta: Meta<typeof UBHeader> = {
  title: 'components/UBHeader', 
  component: UBHeader,
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