// UBAnonymousTips.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import  { UBAnonymousTips } from './UBAnonymousTips';

const meta: Meta<typeof UBAnonymousTips> = {
  title: 'components/UBAnonymousTips', 
  component: UBAnonymousTips,
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