// UBAvatarWithStatus.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import  { UBAvatarWithStatus } from './UBAvatarWithStatus';

const meta: Meta<typeof UBAvatarWithStatus> = {
  title: 'common/UBAvatarWithStatus', 
  component: UBAvatarWithStatus,
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