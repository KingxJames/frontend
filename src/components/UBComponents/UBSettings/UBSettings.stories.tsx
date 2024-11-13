// UBSettings.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import  { UBSettings } from './UBSettings';

const meta: Meta<typeof UBSettings> = {
  title: 'components/UBSettings', 
  component: UBSettings,
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