// UBEmergencies.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import  { UBEmergencies } from './UBEmergencies';

const meta: Meta<typeof UBEmergencies> = {
  title: 'components/Emergencies', 
  component: UBEmergencies,
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