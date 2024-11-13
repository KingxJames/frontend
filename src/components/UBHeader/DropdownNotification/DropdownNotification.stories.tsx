// DropdownNotification.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import  { DropdownNotification } from './DropdownNotification';

const meta: Meta<typeof DropdownNotification> = {
  title: 'components/DropdownNotification', 
  component: DropdownNotification,
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