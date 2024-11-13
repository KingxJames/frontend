// DarkModeSwitcher.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import  { DarkModeSwitcher } from './DarkModeSwitcher';

const meta: Meta<typeof DarkModeSwitcher> = {
  title: 'components/DarkModeSwitcher', 
  component: DarkModeSwitcher,
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